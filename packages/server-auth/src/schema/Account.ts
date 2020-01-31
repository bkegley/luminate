import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {AccountDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
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
    listAccounts: async (parent, args, {models}) => {
      const {Account} = models
      const results = await createConnectionResults({args, model: Account})
      return results
    },
    getAccount: async (parent, {id}, {loaders}, info) => {
      const {accounts} = loaders
      return accounts.load(id)
    },
  },
  Mutation: {
    createAccount: async (parent, {input}, {models}) => {
      const {Account} = models
      const account = await new Account({...input, type: ['account']}).save()
      return account
    },
    updateAccount: async (parent, {id, input}, {models}) => {
      const {Account} = models
      const account = await Account.findByIdAndUpdate(id, input, {new: true})
      return account
    },
    deleteAccount: async (parent, {id}, {models}) => {
      const {Account} = models
      const account = await Account.findByIdAndDelete(id)
      if (!account) {
        throw new ApolloError('Document not found')
      }
      return account
    },
    addUserToAccount: async (parent, {accountId, userId}, {models}) => {
      const {User} = models
      const user = await User.findByIdAndUpdate(userId, {$push: {accounts: accountId}}, {new: true})
      return !!user
    },
  },
}

export interface AccountLoaders {
  accounts: LoaderFn<AccountDocument>
}

export const loaders: AccountLoaders = {
  accounts: async (ids, models) => {
    const {Account} = models
    const accounts = await Account.find({_id: ids})
    return ids.map(id => {
      const account = accounts.find(account => account._id.toString() === id.toString())
      if (!account) throw new Error('Document not found')
      return account
    })
  },
}

export const schema = {typeDefs, resolvers}
