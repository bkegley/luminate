import {gql} from 'apollo-server-express'
import {Resolvers} from '../../types'
import {TYPES} from '../../utils/types'
import {
  CreateUserCommand,
  DeleteUserCommand,
  LoginUserCommand,
  UpdateUserCommand,
  UpdateUserPasswordCommand,
  SwitchAccountCommand,
  UpdateUserRolesCommand,
  ICommandRegistry,
  CommandType,
} from '../../application/commands'
import jwt from 'jsonwebtoken'
import {Token} from '@luminate/graphql-utils'
import {IUsersProjection} from '../../infra/projections'
import {IAccountsRepo, IRolesRepo, IUsersRepo} from '../../infra/repos'
import {AccountMapper} from '../../infra/mappers/AccountMapper'
import {RoleMapper} from '../../infra/mappers/RoleMapper'
import {UserAggregate} from '../../domain/user/User'
import {UserMapper} from '../../infra/mappers/UserMapper'

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
    deleteUser(id: ID!): Boolean
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean!
    login(username: String!, password: String!): Boolean
    logout: Boolean!
    switchAccount(accountId: ID!): Boolean
    refreshToken: Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    // TODO: fix this
    // @ts-ignore
    listUsers: async (parent, args, {container}) => {
      const usersProjection = container.resolve<IUsersProjection>(TYPES.UsersProjection)
      return usersProjection.getConnectionResults(args)
    },
    // TODO: fix this
    // @ts-ignore
    getUser: async (parent, {id}, {container}) => {
      return container.resolve<IUsersProjection>(TYPES.UsersProjection).getUser(id)
    },
    // TODO: fix this
    // @ts-ignore
    me: async (parent, args, {user, container}) => {
      return container.resolve<IUsersProjection>(TYPES.UsersProjection).getUser(user.jti)
    },
  },
  Mutation: {
    // @ts-ignore
    createUser: async (parent, {input}, {container}) => {
      const createUserCommand = new CreateUserCommand(input)
      const user = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateUserCommand, UserAggregate>(CommandType.CREATE_USER_COMMAND, createUserCommand)
      return UserMapper.toDTO(user)
    },
    // @ts-ignore
    updateUser: async (parent, {id, input}, {container}) => {
      const updateUserCommand = new UpdateUserCommand(id, input)
      const user = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateUserCommand, UserAggregate>(CommandType.UPDATE_USER_COMMAND, updateUserCommand)
      return UserMapper.toDTO(user)
    },
    // @ts-ignore
    updateUserRoles: async (parent, {id, roles}, {user, container}) => {
      if (!user) {
        return null
      }
      const updateUserRolesCommand = new UpdateUserRolesCommand({id, roles, account: user.account.id})

      const userAggregate = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateUserRolesCommand, UserAggregate>(CommandType.UPDATE_USER_ROLES_COMMAND, updateUserRolesCommand)
      return UserMapper.toDTO(userAggregate)
    },
    deleteUser: async (parent, {id}, {container}) => {
      const deleteUserCommand = new DeleteUserCommand(id)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<DeleteUserCommand, boolean>(CommandType.DELETE_USER_COMMAND, deleteUserCommand)
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
    account: async (parent, args, {container, user}) => {
      if (!user || !user.account) {
        return null
      }
      const accountsRepo = container.resolve<IAccountsRepo>(TYPES.AccountsRepo)
      const accountAggregate = await accountsRepo.getById(user.account.id)
      return AccountMapper.toDTO(accountAggregate)
    },
    accounts: async (parent, args, {container, user}) => {
      if (!user || !user.accounts) {
        return null
      }
      const accounts = await container
        .resolve<IAccountsRepo>(TYPES.AccountsRepo)
        .list({id: user.accounts.map(account => account.id)})
      return accounts.map(account => AccountMapper.toDTO(account))
    },
    roles: async (parent, args, {user, container}) => {
      if (!user || !user.roles) {
        return null
      }

      const roles = await container.resolve<IRolesRepo>(TYPES.RolesRepo).list({id: user.roles.map(role => role.id)})
      return roles.map(role => RoleMapper.toDTO(role))
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
      const roles = parent.roles?.filter((role: any) => role.account === user.account?.id)

      if (!roles) {
        return []
      }

      const rolesRepo = container.resolve<IRolesRepo>(TYPES.RolesRepo)
      const roleAggregates = await rolesRepo.list({id: roles.map(role => role.id)})
      return roleAggregates.map(role => RoleMapper.toDTO(role))
    },
    scopes: async (parent, args, {user, container}) => {
      const accountRoles = parent.roles?.find((role: any) => role.account === user.account?.id)

      if (!accountRoles) {
        return []
      }

      const rolesRepo = container.resolve<IRolesRepo>(TYPES.RolesRepo)
      const roles = await rolesRepo.list({id: accountRoles})

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
