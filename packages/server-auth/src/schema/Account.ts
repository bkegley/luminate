import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {AccountDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    users: [User!]
  }

  type AccountConnection {
    pageInfo: PageInfo!
    edges: [AccountEdge!]!
  }

  type AccountEdge {
    cursor: String
    node: Account
  }

  input CreateAccountInput {
    name: String!
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
    createAccount: async (parent, {input}, {models, user}) => {
      const {Account} = models
      const account = await Account.createByUser(user, {...input, type: ['account']})
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
      const {User} = models
      const updatedUser = await User.findByIdAndUpdateByUser(user, userId, {$push: {accounts: accountId}}, {new: true})
      return !!updatedUser
    },
  },
  Account: {
    users: async (parent, args, {models, user}) => {
      const {User} = models
      const users = await User.findByUser(user, {accounts: parent.id})
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
