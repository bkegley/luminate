import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {RoleDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    scopes: [Scope!]!
    createdAt: String!
    updatedAt: String!
  }

  type RoleConnection {
    pageInfo: PageInfo!
    edges: [RoleEdge!]!
  }

  type RoleEdge {
    cursor: String!
    node: Role!
  }

  input CreateRoleInput {
    name: String!
    scopes: [ID!]
  }

  input UpdateRoleInput {
    name: String
    scopes: [ID!]
  }

  extend type Query {
    listRoles(cursor: String, limit: Int, query: [QueryInput]): RoleConnection!
    getRole(id: ID!): Role
  }

  extend type Mutation {
    createRole(input: CreateRoleInput!): Role
    updateRole(id: ID!, input: UpdateRoleInput!): Role
    deleteRole(id: ID!): Role
  }
`

const resolvers: Resolvers = {
  Query: {
    listRoles: async (parent, args, {models, user}) => {
      const {Role} = models
      const results = await createConnectionResults({user, args, model: Role})
      return results
    },
    getRole: async (parent, {id}, {loaders}, info) => {
      const {roles} = loaders
      return roles.load(id)
    },
  },
  Mutation: {
    createRole: async (parent, {input}, {models, user}) => {
      const {Role} = models
      const role = await Role.createByUser(user, {...input, type: ['role']})
      return role
    },
    updateRole: async (parent, {id, input}, {models, user}) => {
      const {Role} = models
      const role = await Role.findByIdAndUpdateByUser(user, id, input, {new: true})
      return role
    },
    deleteRole: async (parent, {id}, {models, user}) => {
      const {Role} = models
      const role = await Role.findByIdAndDeleteByUser(user, id, {})
      if (!role) {
        throw new ApolloError('Document not found')
      }
      return role
    },
  },
  Role: {
    scopes: async (parent, args, {loaders}) => {
      const {scopes} = loaders
      if (!parent.scopes) return []
      return (await Promise.all(parent.scopes.map(id => scopes.load(id)))).filter(Boolean)
    },
  },
}

export interface RoleLoaders {
  roles: LoaderFn<RoleDocument>
}

export const loaders: RoleLoaders = {
  roles: async (ids, models, user) => {
    const {Role} = models
    const roles = await Role.findByUser(user, {_id: ids})
    return ids
      .map(id => {
        const role = roles.find(role => role._id.toString() === id.toString())
        if (!role) return null
        return role
      })
      .filter(Boolean)
  },
}

export const schema = {typeDefs, resolvers}
