import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import bcrypt from 'bcrypt'
import {Resolvers, User} from '../types'

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
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
    listUsers(cursor: String, limit: Int, query: [QueryInput]): UserConnection!
    getUser(id: ID!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean
  }
`

export const resolvers: Resolvers = {
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
  },
}

export interface UserLoaders {
  users: LoaderFn<User>
}

export const loaders: UserLoaders = {
  users: async (ids, models) => {
    const {User} = models
    const users = await User.find({_id: ids})
    return ids.map(id => {
      return users.find((user: any) => user._id.toString() === id.toString())
    })
  },
}
