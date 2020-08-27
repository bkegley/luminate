import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {TYPES} from '../utils/types'
import {IAccountsAggregate} from '../aggregates'

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
    listAccounts: async (parent, args, {container}) => {
      const accountsAggregate = container.resolve<IAccountsAggregate>(TYPES.AccountsAggregate)
      return accountsAggregate.getConnectionResults(args)
    },
    getAccount: async (parent, {id}, {container}, info) => {
      const accountsAggregate = container.resolve<IAccountsAggregate>(TYPES.AccountsAggregate)
      return accountsAggregate.getAccount(id)
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
      return services.user.listByAccount(parent.id)
    },
  },
}

export const schema = {typeDefs, resolvers}
