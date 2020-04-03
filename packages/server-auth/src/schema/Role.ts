import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    scopes: [String!]!
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
    scopes: [String!]
  }

  input UpdateRoleInput {
    name: String
    scopes: [String!]
  }

  extend type Query {
    listRoles(cursor: String, limit: Int, query: [QueryInput!]): RoleConnection!
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
    listRoles: async (parent, args, {services}) => {
      return services.role.getConnectionResults(args)
    },
    getRole: async (parent, {id}, {services}) => {
      return services.role.getById(id)
    },
  },
  Mutation: {
    createRole: async (parent, {input}, {services}) => {
      return services.role.create(input)
    },
    updateRole: async (parent, {id, input}, {services}) => {
      return services.role.updateById(id, input)
    },
    deleteRole: async (parent, {id}, {services}) => {
      return services.role.deleteById(id)
    },
  },
}

export const schema = {typeDefs, resolvers}
