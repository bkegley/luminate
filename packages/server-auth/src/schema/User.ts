import {gql} from 'apollo-server-express'
import {LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {UserDocument} from '@luminate/mongo'
import {UserService} from '@luminate/mongo/src/services'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    account: Account
    accounts: [Account!]!
    roles: [Role!]!
    scopes: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge!]!
  }

  type UserEdge {
    cursor: String!
    node: User!
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String!
    password: String!
    roles: [ID!]
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    username: String
    roles: [ID!]
  }

  input UpdatePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  extend type Query {
    listUsers(cursor: String, limit: Int, query: [QueryInput!]): UserConnection!
    getUser(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean!
    login(username: String!, password: String!): Boolean
    logout: Boolean!
    switchAccount(accountId: ID!): Boolean
    refreshToken: Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listUsers: async (parent, args, {services}) => {
      return services.user.getConnectionResults(args)
    },
    getUser: async (parent, {id}, {services}, info) => {
      return services.user.getById(id)
    },
    me: async (parent, args, {services}) => {
      return services.user.getMe()
    },
  },
  Mutation: {
    createUser: async (parent, {input}, {services}) => {
      return services.user.create(input)
    },
    updateUser: async (parent, {id, input}, {services}) => {
      return services.user.updateById(id, input)
    },
    deleteUser: async (parent, {id}, {services}) => {
      return services.user.deleteUserById(id)
    },
    updatePassword: async (parent, {id, input}, {services}) => {
      return services.user.updatePassword(id, input)
    },
    login: async (parent, {username, password}, {services, res}) => {
      const token = await services.user.createLoginToken({username, password})
      if (!token) return false
      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
      return true
    },
    logout: (parent, args, {res}) => {
      res.cookie('id', '', {
        expires: new Date(0),
      })
      return true
    },
    refreshToken: (parent, args, {res, services}) => {
      const token = services.user.refreshToken()
      if (!token) {
        res.cookie('id', '', {
          expires: new Date(0),
        })
        return false
      }

      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
      return true
    },

    switchAccount: async (parent, {accountId}, {res, services}) => {
      const token = await services.user.switchAccount(accountId)
      if (!token) return false
      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
      return true
    },
  },
  // @ts-ignore
  User: {
    account: (parent, args, {services, loaders}) => {
      return services.account.getCurrentAccount()
    },
    accounts: async (parent, args, {services}) => {
      return services.account.listUserAccounts()
    },
    roles: async (parent, args, {services}) => {
      return services.role.listCurrentRoles()
    },
    scopes: async (parent, args, {services}) => {
      return services.role.listCurrentScopes()
    },
  },
}

export interface UserLoaders {
  users: LoaderFn<UserDocument, {user: UserService}>
}

export const loaders: UserLoaders = {
  users: (ids, services) => {
    return services.user.findUsers({_id: ids})
  },
}

export const schema = {typeDefs, resolvers}
