import {gql, ApolloError} from 'apollo-server-express'
import {
  createConnectionResults,
  LoaderFn,
  createToken,
  parseToken,
  parseArgs,
  parseCursorHash,
  createCursorHash,
  hasScopes,
  Token,
} from '@luminate/graphql-utils'
import bcrypt from 'bcrypt'
import {Resolvers} from '../types'
import {UserDocument, RoleDocument, AccountDocument} from '@luminate/mongo'

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
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    updatePassword(id: ID!, input: UpdatePasswordInput!): Boolean!
    updateUserRoles(userId: ID!, roles: [ID!]!): User
    login(username: String!, password: String!): Boolean
    logout: Boolean!
    refreshToken: Boolean
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
    me: async (parent, args, {user, models}) => {
      if (!user) return null
      const {User} = models
      const hydratedUser = await User.findById(user.jti)
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
      if (!user || !hasScopes(user, ['admin:user'])) {
        throw new Error('Not allowed')
      }
      const {User} = models
      const {roles, ...remainingInput} = input

      const data = Object.assign(remainingInput, roles ? {$set: {[`roles.$.roles`]: roles}} : null)

      const updatedUser = await User.findOneAndUpdateByUser(user, {_id: id, 'roles.account': user.account?.id}, data, {
        new: true,
      })
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
        .populate({path: 'accounts'})
        .populate({
          path: 'roles.roles',
        })

      if (!user) return false

      const passwordMatches = await bcrypt.compare(password, user.password)

      if (!passwordMatches) return false

      const accounts = (user.accounts as unknown) as AccountDocument[] | undefined
      const accountId = user.defaultAccount
        ? user.defaultAccount.toString()
        : accounts
        ? accounts[0]._id.toString()
        : undefined

      const account = accounts?.find(account => account._id.toString() === accountId)

      const {roles: userDocRoles} = user
      const accountRoles = (userDocRoles
        ?.filter(role => account && role.account.toString() === account._id.toString())
        .map(role => role.roles)
        .flat() as unknown) as RoleDocument[]

      const roles = accountRoles.map(role => ({id: role._id, name: role.name}))

      const scopes =
        accountRoles?.reduce((acc, role) => {
          const scopes = role.scopes
          const newScopes = scopes?.filter(scope => !acc.find(existingScope => existingScope === scope))
          return acc.concat(newScopes || [])
        }, [] as string[]) || []

      const input = {
        jti: user._id,
        sub: user.username,
        account,
        accounts,
        roles,
        scopes,
      }

      const token = createToken(res, input, USER_AUTH_TOKEN)

      return !!token
    },
    logout: (parent, args, {res}) => {
      res.cookie('id', '', {
        expires: new Date(0),
      })
      return true
    },
    refreshToken: (parent, args, {res, user}) => {
      if (!user) return false
      const {iat, exp, ...remainingToken} = user
      try {
        createToken(res, remainingToken, USER_AUTH_TOKEN)
        return true
      } catch (err) {
        console.log({err})
        return false
      }
    },
  },
  User: {
    account: (parent, args, {user}) => {
      return null
      // login mutation attached account to parent
      // const {account} = parent as Token
      // if (account) {
      //   return account
      // }

      // if (!user || !user.account) return null
      // return {
      //   ...user.account,
      //   id: user.account.id,
      // }
    },
    accounts: async (parent, args, {loaders, user}) => {
      return []
      // if (!user) return []
      // if (user?.accounts) {
      //   return user.accounts?.map(account => ({...account, id: account.id})) || []
      // }
      // const {accounts} = user
      // return accounts || []
    },
    roles: async (parent, args, {loaders, user}) => {
      return []
      // if (!user) return []
      // if (user?.roles) {
      //   return user.roles.map(role => ({...role, id: role.id})) as RoleDocument[]
      // }
      // const {account} = user
      // const {roles} = loaders
      // if (!parent.roles) return []

      // const accountRoles = parent.roles
      //   ?.filter(role => role.account.toString() === account?.id.toString())
      //   .map(role => role.roles)
      //   .flat()

      // return (await Promise.all(accountRoles.map(role => roles.load(role.toString())))).filter(Boolean)
    },
    scopes: async (parent, args, {loaders, models, user}) => {
      return []
      // if (!user) {
      //   return []
      // }
      // if (user?.scopes?.length) {
      //   return user.scopes
      // }
      // const {Role} = models
      // const {account} = user
      // const accountRoles = parent.roles?.find(role => {
      //   return role.account.toString() === account?.id.toString()
      // })?.roles
      // const roles = await Role.find({_id: accountRoles})
      // return roles.map(role => role.scopes).flat()
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
