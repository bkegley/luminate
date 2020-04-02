import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {AccountDocument} from '@luminate/mongo'
import {LoaderFn} from '@luminate/graphql-utils'
import {AccountService} from '@luminate/mongo/src/services'

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
    listAccounts(cursor: String, limit: Int, query: [QueryInput!]): AccountConnection!
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
    listAccounts: async (parent, args, {models, user, services}) => {
      return services.account.getConnectionResults(args)
    },
    getAccount: async (parent, {id}, {services}, info) => {
      return services.account.getById(id)
    },
  },
  Mutation: {
    createAccount: async (parent, {input}, {services}) => {
      return services.account.create(input)
    },
    updateAccount: async (parent, {id, input}, {services}) => {
      return services.account.updateById(id, input)
    },
    deleteAccount: async (parent, {id}, {services}) => {
      return services.account.deleteById(id)
    },
    addUserToAccount: async (parent, {accountId, userId}, {services}) => {
      return services.account.addUserToAccount(accountId, userId)
    },
  },
  Account: {
    users: async (parent, args, {services}) => {
      return services.user.findUsers({accounts: parent.id})
    },
  },
}

export interface AccountLoaders {
  accounts: LoaderFn<AccountDocument, {account: AccountService}>
}

export const loaders: AccountLoaders = {
  accounts: (ids, services) => {
    return services.account.findAccounts({_id: ids})
  },
}

export const schema = {typeDefs, resolvers}
