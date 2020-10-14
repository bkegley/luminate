import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, createToken, parseToken, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {AccountDocument, UserDocument} from '@luminate/mongo'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    users: [User!]
    createdAt: String!
    updatedAt: String!
  }

  type AccountConnection {
    pageInfo: PageInfo!
    edges: [AccountEdge!]!
  }

  type AccountEdge {
    cursor: String!
    node: Account!
  }

  input CreateAccountInput {
    name: String!
    username: String!
    password: String!
  }

  input UpdateAccountInput {
    name: String
  }

  extend type Query {
    listAccounts(cursor: String, limit: Int, query: [QueryInput]): AccountConnection!
    getAccount(id: ID!): Account
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): Account
    updateAccount(id: ID!, input: UpdateAccountInput!): Account
    deleteAccount(id: ID!): Account
    addUserToAccount(accountId: ID!, userId: ID!): Boolean
    switchAccount(accountId: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listAccounts: async (parent, args, {models, user}) => {
      const {Account} = models
      const results = await createConnectionResults({user, args, model: Account})
      return results
    },
    getAccount: async (parent, {id}, {loaders}, info) => {
      const {accounts} = loaders
      return accounts.load(id)
    },
  },
  Mutation: {
    createAccount: async (parent, {input}, {models}) => {
      const {Account, User, Role} = models
      const {name, username, password} = input
      const account = await Account.create({name, type: ['account']})

      const ownerRole = await Role.findOne({name: 'Owner'})
      if (!ownerRole) {
        return null
      }
      const user = await User.create({
        username,
        password,
        roles: [
          {
            account: account._id,
            roles: [ownerRole._id],
          },
        ],
        accounts: [account._id],
        readAccess: [account._id],
        writeAccess: [account._id],
        adminAccess: [account._id],
        type: ['user'],
      })
      return account
    },
    updateAccount: async (parent, {id, input}, {models, user}) => {
      const {Account} = models
      const account = await Account.findByIdAndUpdateByUser(user, id, input, {new: true})
      return account
    },
    deleteAccount: async (parent, {id}, {models, user}) => {
      const {Account} = models
      const account = await Account.findByIdAndDeleteByUser(user, id, {})
      if (!account) {
        throw new ApolloError('Document not found')
      }
      return account
    },
    addUserToAccount: async (parent, {accountId, userId}, {models, user}) => {
      // TODO: add adminAccess privies on user
      const {User} = models
      const updatedUser = await User.findOneAndUpdate(
        {_id: userId, 'roles.account': {$ne: accountId}},
        {
          $addToSet: {accounts: accountId},
          $push: {
            roles: {account: accountId},
          },
        },
        {new: true},
      )
      return !!updatedUser
    },
    switchAccount: async (parent, {accountId}, {models, user, res, req}) => {
      if (!user) return false

      const {User} = models

      interface PopulatedUser extends Omit<UserDocument, 'accounts'> {
        accounts: AccountDocument[] | undefined
      }

      const foundUser = ((await User.findById(user.jti).populate({
        path: 'accounts',
      })) as unknown) as PopulatedUser | null
      if (!foundUser) return false

      const newAccount = foundUser.accounts?.find(account => account._id.toString() === accountId.toString())

      if (newAccount) {
        const existingToken = parseToken(req.cookies.id, USER_AUTH_TOKEN)
        const {account, iat, exp, ...remainingToken} = existingToken
        const token = createToken(
          res,
          {...remainingToken, account: {id: newAccount._id, name: newAccount.name}},
          USER_AUTH_TOKEN,
        )

        return !!token
      }
      return false
    },
  },
  Account: {
    users: async (parent, args, {models, user}) => {
      const {User} = models
      const users = await User.find({accounts: parent.id})
      return users
    },
  },
}

export interface AccountLoaders {
  accounts: LoaderFn<AccountDocument>
}

export const loaders: AccountLoaders = {
  accounts: async (ids, models, user) => {
    const {Account} = models
    const accounts = await Account.findByUser(user, {_id: ids})
    return ids.map(id => {
      const account = accounts.find(account => account._id.toString() === id.toString())
      if (!account) return null
      return account
    })
  },
}

export const schema = {typeDefs, resolvers}
