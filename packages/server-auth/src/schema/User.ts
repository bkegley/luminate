import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn, createToken} from '@luminate/graphql-utils'
import bcrypt from 'bcrypt'
import {Resolvers} from '../types'
import {UserDocument} from '@luminate/mongo'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    firstName: String
    lastName: String
    accounts: [Account]
    roles: [Role]
    scopes: [Scope]
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge!]!
  }

  type UserEdge {
    cursor: String
    node: User
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
    listUsers(cursor: String, limit: Int, query: [QueryInput]): UserConnection!
    getUser(id: ID!): User
    hydrateMe: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean
    updateUserRoles(userId: ID!, roles: [ID!]!): User
    login(username: String!, password: String!): User
    logout: Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listUsers: async (parent, args, {models, user}) => {
      const {User} = models
      const results = await createConnectionResults({user, args: {...args, type: 'user'}, model: User})
      return results
    },
    getUser: async (parent, {id}, {loaders}, info) => {
      const {users} = loaders
      return users.load(id)
    },
    hydrateMe: async (parent, args, {user, models}) => {
      if (!user) return null
      const {User} = models
      const hydratedUser = await User.findById(user._id)
      return hydratedUser
    },
  },
  Mutation: {
    createUser: async (parent, {input}, {models, user}) => {
      const {User} = models
      const newUser = await User.createByUser(user, {...input, type: ['user']})
      return newUser
    },
    updateUser: async (parent, {id, input}, {models, user}) => {
      const {User} = models
      const updatedUser = await User.findByIdAndUpdateByUser(user, id, input, {new: true})
      return updatedUser
    },
    deleteUser: async (parent, {id}, {models}) => {
      const {User} = models
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        throw new ApolloError('Document not found')
      }
      return user
    },
    updatePassword: async (parent, {id, input}, {models, user}) => {
      const {User} = models
      const foundUser = await User.findByIdByUser(user, id)

      if (!foundUser || !foundUser.password) return false

      const currentPasswordMatches = await bcrypt.compare(input.currentPassword, foundUser.password)

      // if (currentPasswordMatches) {
      //   // must save password this way in order to trigger pre-save hook for hashing
      //   user.password = input.newPassword
      //   user.save()
      //   return true
      // }

      return false
    },
    updateUserRoles: async (parent, {userId, roles}, {models, user}) => {
      const {User} = models

      const updatedUser = await User.findByIdAndUpdateByUser(
        user,
        userId,
        {$set: {'roles.$.roles': roles}},
        {new: true},
      )
      return updatedUser
    },
    login: async (parent, {username, password}, {models, res}) => {
      const {User} = models
      const user = await User.findOne({username})

      if (!user) return null

      const passwordMatches = await bcrypt.compare(password, user.password)

      if (!passwordMatches) return null

      const accountId = user.defaultAccount ? user.defaultAccount : user.accounts ? user.accounts[0] : undefined

      const token = createToken({userId: user.id, accountId}, USER_AUTH_TOKEN)

      res.cookie('id', token, {
        httpOnly: true,
        secure: false,
      })

      return user
    },
    logout: (parent, args, {res}) => {
      res.cookie('id', '', {
        expires: new Date(0),
      })
      return true
    },
  },
  User: {
    accounts: async (parent, args, {loaders}) => {
      const {accounts} = loaders
      if (!parent.accounts) return null
      return (await Promise.all(parent.accounts.map(id => accounts.load(id)))).filter(Boolean)
    },
    roles: async (parent, args, {loaders, user}) => {
      const {roles} = loaders
      if (!parent.roles) return null

      const accountRoles = parent.roles
        ?.filter(role => role.account.toString() === user?.account?.toString())
        .map(role => role.roles)
        .flat()

      return (await Promise.all(accountRoles.map(role => roles.load(role)))).filter(Boolean)
    },
    scopes: async (parent, args, {loaders, models, user}) => {
      const {Role} = models
      return null
      // const accountRoles = parent.roles
      //   ?.filter(role => role.account.toString() === user?.account?.toString())
      //   .map(role => role.roles)
      //   .flat()
      // const roles = await Role.find({_id: accountRoles})

      // if (!roles) return null

      // const {scopes} = loaders
      // const allScopeIds = roles.reduce((acc, role) => {
      //   return acc.concat(
      //     role.scopes?.filter(id => !acc.find(existingId => existingId.toString() === id.toString())) || [],
      //   )
      // }, [] as string[])

      // return Promise.all(allScopeIds.map(id => scopes.load(id)))
    },
  },
}

export interface UserLoaders {
  users: LoaderFn<UserDocument>
}

export const loaders: UserLoaders = {
  users: async (ids, models, user) => {
    const {User} = models
    const users = await User.findByUser(user, {_id: ids})
    return ids.map(id => {
      const user = users.find(user => user._id.toString() === id.toString())
      if (!user) return null
      return user
    })
  },
}

export const schema = {typeDefs, resolvers}
