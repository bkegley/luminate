import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn, createToken} from '@luminate/graphql-utils'
import bcrypt from 'bcrypt'
import {Resolvers} from '../types'
import tokenJSON from '../token.json'
import {UserDocument} from '@luminate/mongo'

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    firstName: String
    lastName: String
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
    login(username: String!, password: String!): User
    logout: Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listUsers: async (parent, args, {models}) => {
      const {User} = models
      const results = await createConnectionResults({args: {...args, type: 'user'}, model: User})
      return results
    },
    getUser: async (parent, {id}, {loaders}, info) => {
      const {users} = loaders
      return users.load(id)
    },
    hydrateMe: async (parent, args, {user, loaders}) => {
      const {users} = loaders
      if (!user) return null
      return users.load(user._id)
    },
  },
  Mutation: {
    createUser: async (parent, {input}, {models}) => {
      const {User} = models
      const user = await new User({...input, type: ['user']}).save()
      return user
    },
    updateUser: async (parent, {id, input}, {models}) => {
      const {User} = models
      const user = await User.findByIdAndUpdate(id, input, {new: true})
      return user
    },
    deleteUser: async (parent, {id}, {models}) => {
      const {User} = models
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        throw new ApolloError('Document not found')
      }
      return user
    },
    updatePassword: async (parent, {id, input}, {models}) => {
      const {User} = models
      const foundUser = await User.findById(id)

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
    login: async (parent, {username, password}, {models, res}) => {
      const {User} = models
      const user = await User.findOne({username})

      if (!user) return null

      const passwordMatches = await bcrypt.compare(password, user.password)

      if (!passwordMatches) return null

      const token = createToken(user.id, tokenJSON.token)

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
    roles: async (parent, args, {loaders}) => {
      const {roles} = loaders
      if (!parent.roles) return null
      return Promise.all(parent.roles.map(id => roles.load(id)))
    },
    scopes: async (parent, args, {loaders, models}) => {
      const {Role} = models
      const roles = await Role.find({_id: parent.roles})

      if (!roles) return null

      const {scopes} = loaders
      const allScopeIds = roles.reduce((acc, role) => {
        return acc.concat(
          role.scopes?.filter(id => !acc.find(existingId => existingId.toString() === id.toString())) || [],
        )
      }, [] as string[])

      return Promise.all(allScopeIds.map(id => scopes.load(id)))
    },
  },
}

export interface UserLoaders {
  users: LoaderFn<UserDocument>
}

export const loaders: UserLoaders = {
  users: async (ids, models) => {
    const {User} = models
    const users = await User.find({_id: ids})
    return ids.map(id => {
      const user = users.find(user => user._id.toString() === id.toString())
      if (!user) throw new Error('Document not found')
      return user
    })
  },
}

export const schema = {typeDefs, resolvers}
