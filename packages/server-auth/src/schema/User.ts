import {gql, ApolloError} from 'apollo-server-express'
import {
  createConnectionResults,
  LoaderFn,
  createToken,
  parseArgs,
  parseCursorHash,
  createCursorHash,
} from '@luminate/graphql-utils'
import bcrypt from 'bcrypt'
import {Resolvers} from '../types'
import {AuthenticatedUserDocument, UserDocument} from '@luminate/mongo'

const USER_AUTH_TOKEN = process.env.USER_AUTH_TOKEN || 'localsecrettoken'

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
    listUsers(cursor: String, limit: Int, query: [QueryInput]): UserConnection!
    getUser(id: ID!): User
    hydrateMe: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean!
    updateUserRoles(userId: ID!, roles: [ID!]!): User
    login(username: String!, password: String!): User
    logout: Boolean!
  }
`

const resolvers: Resolvers = {
  Query: {
    listUsers: async (parent, args, {models, user}) => {
      const {User} = models
      const {cursor, limit, query, ...remainingArgs} = args
      const cursorWithDefault = cursor || createCursorHash(new Date())
      const limitWithDefault = limit || 100

      const parsedArgs = parseArgs({cursor: cursorWithDefault, query})
      const resultsPlusOne = await User.find({...parsedArgs, type: 'user'}, null, {
        sort: '-updatedAt',
        limit: limitWithDefault + 1,
      })

      if (!resultsPlusOne.length) {
        return {
          pageInfo: {
            hasNextPage: false,
            nextCursor: null,
            previousCursor: '',
          },
          edges: [],
        }
      }

      const hasNextPage = resultsPlusOne.length > limitWithDefault
      const documents = hasNextPage ? resultsPlusOne.slice(0, -1) : resultsPlusOne

      const nextCursor = hasNextPage ? createCursorHash(resultsPlusOne[resultsPlusOne.length - 1].updatedAt) : null

      const data = {
        pageInfo: {
          hasNextPage,
          nextCursor,
          previousCursor: '',
        },
        edges: documents.map(document => {
          return {
            node: document,
            cursor: createCursorHash(document.updatedAt),
          }
        }),
      }

      return data
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
      let account: AuthenticatedUserDocument['account']
      const {User} = models
      const user = (await User.findOne({username}).populate({path: 'accounts'})) as AuthenticatedUserDocument

      if (!user) return null

      const passwordMatches = await bcrypt.compare(password, user.password)

      if (!passwordMatches) return null

      const accountId = user.defaultAccount
        ? user.defaultAccount.toString()
        : user.accounts
        ? user.accounts[0]._id.toString()
        : undefined
      account = user.accounts?.find(account => account._id.toString() === accountId)
      const token = createToken({userId: user.id, accountId}, USER_AUTH_TOKEN)

      res.cookie('id', token, {
        httpOnly: true,
        secure: false,
      })

      return {
        ...user.toObject(),
        id: user._id,
        account,
        accounts: user.accounts?.map(account => ({...account.toObject(), id: account._id})) || [],
      }
    },
    logout: (parent, args, {res}) => {
      res.cookie('id', '', {
        expires: new Date(0),
      })
      return true
    },
  },
  User: {
    account: (parent, args, {user}) => {
      // login mutation attached account to parent
      const {account} = parent as AuthenticatedUserDocument
      if (account) {
        return account
      }

      if (!user || !user.account) return null
      return {
        ...user.account,
        id: user.account._id,
      }
    },
    accounts: async (parent, args, {user}) => {
      const {accounts} = parent as AuthenticatedUserDocument
      if (accounts) {
        return accounts
      }

      return user?.accounts || []
    },
    roles: async (parent, args, {loaders, user}) => {
      const {account} = parent as AuthenticatedUserDocument
      const {roles} = loaders
      if (!parent.roles) return []

      const accountRoles = parent.roles
        ?.filter(role => role.account.toString() === account?._id.toString())
        .map(role => role.roles)
        .flat()

      return (await Promise.all(accountRoles.map(role => roles.load(role.toString())))).filter(Boolean)
    },
    scopes: async (parent, args, {loaders, models}) => {
      const {Role} = models
      const {account} = parent as AuthenticatedUserDocument
      const accountRoles = parent.roles?.find(role => {
        return role.account.toString() === account?._id.toString()
      })?.roles
      const roles = await Role.find({_id: accountRoles})
      return roles.map(role => role.scopes).flat()
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
