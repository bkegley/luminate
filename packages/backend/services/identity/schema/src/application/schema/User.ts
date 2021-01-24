import {gql} from 'apollo-server-express'
import {Resolvers} from '../../types'
import {TYPES} from '../../utils/types'
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
} from '../../application/commands'
import {UserDocument} from '../../infra/models'
import jwt from 'jsonwebtoken'
import {Token} from '@luminate/graphql-utils'
import {IUsersProjection} from '../../infra/projections'
import {IAccountsRepo, IRolesRepo, IUsersRepo} from '../../infra/repos'

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
`

const resolvers: Resolvers = {
  Query: {
    // @ts-ignore
    listUsers: async (parent, args, {container}) => {
      const usersProjection = container.resolve<IUsersProjection>(TYPES.UsersProjection)
      return usersProjection.getConnectionResults(args)
    },
    getUser: async (parent, {id}, {container}) => {
      return container.resolve<IUsersProjection>(TYPES.UsersProjection).getUser(id)
    },
    me: async (parent, args, {user, container}) => {
      return container.resolve<IUsersProjection>(TYPES.UsersProjection).getUser(user.jti)
    },
  },
  Mutation: {
    createUser: async (parent, {input}, {container}) => {
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
      const accountsRepo = container.resolve<IAccountsRepo>(TYPES.AccountsRepo)
      return accountsRepo.getById(user.account.id)
    },
    accounts: async (parent, args, {container, user}) => {
      if (!user || !user.accounts) {
        return null
      }
      return container.resolve<IAccountsRepo>(TYPES.AccountsRepo).list({id: user.accounts.map(account => account.id)})
    },
    roles: async (parent, args, {user, container}) => {
      console.log({user})
      if (!user || !user.roles) {
        return null
      }

      return container.resolve<IRolesRepo>(TYPES.RolesRepo).list({id: user.roles.map(role => role.id)})
    },
    scopes: async (parent, args, {user, container}) => {
      return user.scopes ?? []
    },
  },
  User: {
    // @ts-ignore
    __resolveReference: async (parent, {container}) => {
      const usersRepo = container.resolve<IUsersRepo>(TYPES.UsersRepo)
      return usersRepo.getById(parent.id)
    },
    // TODO: not sure if this is right
    // @ts-ignore
    accounts: async (parent, args, {container}) => {
      const accountsRepo = container.resolve<IAccountsRepo>(TYPES.AccountsRepo)
      const accounts = await Promise.all(
        parent.accounts.map(async (accountId: any) => await accountsRepo.getById(accountId)),
      )

      return accounts.filter(Boolean)
    },
    roles: async (parent, args, {user, container}) => {
      const roles = parent.roles?.find((role: any) => role.account === user.account?.id)

      if (!roles) {
        return []
      }

      const rolesRepo = container.resolve<IRolesRepo>(TYPES.RolesRepo)
      return rolesRepo.list({id: roles.roles})
    },
    scopes: async (parent, args, {user, container}) => {
      const accountRoles = parent.roles?.find((role: any) => role.account === user.account?.id)

      if (!accountRoles) {
        return []
      }

      const rolesRepo = container.resolve<IRolesRepo>(TYPES.RolesRepo)
      const roles = await rolesRepo.list({id: accountRoles.roles})

      return (
        // TODO: fix this after fixing repo return types
        // @ts-ignore
        roles?.reduce((acc, role) => {
          const scopes = role.scopes
          // TODO: fix this after fixing repo return types
          // @ts-ignore
          const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
          return acc.concat(newScopes || [])
        }, [] as string[]) || []
      )
    },
  },
}

export const schema = {typeDefs, resolvers}
