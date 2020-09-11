import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {TYPES} from '../utils/types'
import {
  CreateUserCommand,
  DeleteUserCommand,
  LoginUserCommand,
  LogoutUserCommand,
  UpdateUserCommand,
  UpdateUserPasswordCommand,
  SwitchAccountCommand,
  UpdateUserRolesCommand,
  ICommandRegistry,
  CommandType,
} from '../commands'
import {IUsersAggregate, IAccountsAggregate, IRolesAggregate} from '../aggregates'
import {UserDocument} from '../models'
import jwt from 'jsonwebtoken'
import {Token} from '@luminate/graphql-utils'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

const typeDefs = gql`
  interface UserInterface {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    accounts: [Account!]!
    roles: [Role!]!
    scopes: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type User implements UserInterface @key(fields: "id") {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    accounts: [Account!]!
    roles: [Role!]!
    scopes: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Me implements UserInterface {
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
  }

  input UpdatePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  extend type Query {
    listUsers(cursor: String, limit: Int, query: [QueryInput!]): UserConnection!
    listStations: [Station]
    getUser(id: ID!): User
    me: Me
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    updateUserRoles(id: ID!, roles: [ID!]): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean!
    login(username: String!, password: String!): Boolean
    logout: Boolean!
    switchAccount(accountId: ID!): Boolean
    refreshToken: Boolean
  }

  type Station {
    id: ID!
    description: String
    city: City
  }

  type City {
    id: ID!
    name: String
  }
`

const resolvers: Resolvers = {
  Query: {
    // @ts-ignore
    listUsers: async (parent, args, {container}) => {
      const usersAggregate = container.resolve<IUsersAggregate>(TYPES.UsersAggregate)
      return usersAggregate.getConnectionResults(args)
    },
    getUser: async (parent, {id}, {container}) => {
      return container.resolve<IUsersAggregate>(TYPES.UsersAggregate).getUser(id)
    },
    me: async (parent, args, {user, container}) => {
      return container.resolve<IUsersAggregate>(TYPES.UsersAggregate).getUser(user.jti)
    },
  },
  Mutation: {
    createUser: async (parent, {input}, {container, services}) => {
      const createUserCommand = new CreateUserCommand(input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateUserCommand, UserDocument>(CommandType.CREATE_USER_COMMAND, createUserCommand)
    },
    updateUser: async (parent, {id, input}, {container}) => {
      const updateUserCommand = new UpdateUserCommand(id, input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateUserCommand, UserDocument>(CommandType.UPDATE_USER_COMMAND, updateUserCommand)
    },
    updateUserRoles: async (parent, {id, roles}, {user, container}) => {
      if (!user) {
        return null
      }
      const updateUserRolesCommand = new UpdateUserRolesCommand({id, roles, account: user.account.id})

      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateUserRolesCommand, UserDocument>(CommandType.UPDATE_USER_ROLES_COMMAND, updateUserRolesCommand)
    },
    deleteUser: async (parent, {id}, {container}) => {
      const deleteUserCommand = new DeleteUserCommand(id)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<DeleteUserCommand, UserDocument>(CommandType.DELETE_USER_COMMAND, deleteUserCommand)
    },
    updatePassword: async (parent, {id, input}, {container}) => {
      const updateUserPasswordCommand = new UpdateUserPasswordCommand(id, input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateUserPasswordCommand, boolean>(
          CommandType.UPDATE_USER_PASSWORD_COMMAND,
          updateUserPasswordCommand,
        )
    },
    login: async (parent, {username, password}, {container, res}) => {
      const loginUserCommand = new LoginUserCommand(username, password)

      const token = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<LoginUserCommand, boolean>(CommandType.LOGIN_USER_COMMAND, loginUserCommand)

      if (!token) return false
      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
      return true
    },
    logout: async (parent, args, {res, container, user}) => {
      if (!user) {
        return false
      }
      const logoutUserCommand = new LogoutUserCommand(user.sub)

      await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<LogoutUserCommand, boolean>(CommandType.LOGOUT_USER_COMMAND, logoutUserCommand)

      res.cookie('id', '', {
        expires: new Date(0),
      })

      return true
    },
    refreshToken: (parent, args, {res, user}) => {
      if (!user) return null
      const {iat, exp, ...remainingToken} = user
      const token = jwt.sign(remainingToken, USER_AUTH_TOKEN, {expiresIn: '10m'})

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
    switchAccount: async (parent, {accountId}, {res, user, container}) => {
      const switchAccountCommand = new SwitchAccountCommand(user, accountId)

      const token = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<SwitchAccountCommand, Token>(CommandType.SWITCH_ACCOUNT_COMMAND, switchAccountCommand)

      if (!token) return false

      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
      return true
    },
  },
  Me: {
    account: (parent, args, {container, user}) => {
      if (!user || !user.account) {
        return null
      }
      const accountsAggregate = container.resolve<IAccountsAggregate>(TYPES.AccountsAggregate)
      return accountsAggregate.getAccount(user.account.id)
    },
    accounts: async (parent, args, {container, user}) => {
      if (!user || !user.accounts) {
        return null
      }
      return container
        .resolve<IAccountsAggregate>(TYPES.AccountsAggregate)
        .listAccounts({id: user.accounts.map(account => account.id)})
    },
    roles: async (parent, args, {user, container}) => {
      console.log({user})
      if (!user || !user.roles) {
        return null
      }

      return container.resolve<IRolesAggregate>(TYPES.RolesAggregate).listRoles({id: user.roles.map(role => role.id)})
    },
    scopes: async (parent, args, {user, container}) => {
      return user.scopes ?? []
    },
  },
  User: {
    // @ts-ignore
    __resolveReference: async (parent, {services}) => {
      const user = await services.user.getById(parent.id)
      console.log({user})
      return services.user.getById(parent.id)
    },
    accounts: async (parent, args, {container}) => {
      const accountsAggregate = container.resolve<IAccountsAggregate>(TYPES.AccountsAggregate)
      const accounts = await Promise.all(
        parent.accounts.map(async accountId => await accountsAggregate.getAccount((accountId as unknown) as string)),
      )

      return accounts.filter(Boolean)
    },
    roles: async (parent, args, {user, container}) => {
      const roles = parent.roles?.find(role => role.account === user.account?.id)

      if (!roles) {
        return []
      }

      const rolesAggregate = container.resolve<IRolesAggregate>(TYPES.RolesAggregate)
      return rolesAggregate.listRoles({id: roles.roles})
    },
    scopes: async (parent, args, {user, container}) => {
      const accountRoles = parent.roles?.find(role => role.account === user.account?.id)

      if (!accountRoles) {
        return []
      }

      const rolesAggregate = container.resolve<IRolesAggregate>(TYPES.RolesAggregate)
      const roles = await rolesAggregate.listRoles({id: accountRoles.roles})

      return (
        roles?.reduce((acc, role) => {
          const scopes = role.scopes
          const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
          return acc.concat(newScopes || [])
        }, [] as string[]) || []
      )
    },
  },
}

export const schema = {typeDefs, resolvers}
