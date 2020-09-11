import {gql} from 'apollo-server-express'
import {Resolvers, RoleConnection} from '../types'
import {IRolesAggregate} from '../aggregates'
import {TYPES} from '../utils/types'
import {CreateRoleCommand, ICommandRegistry, CommandType, UpdateRoleCommand, DeleteRoleCommand} from '../commands'
import {RoleDocument} from '../models'

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
    // @ts-ignore
    listRoles: async (_parent, args, {container}) => {
      const rolesAggregate = container.resolve<IRolesAggregate>(TYPES.RolesAggregate)
      return rolesAggregate.getConnectionResults(args)
    },
    getRole: async (_parent, {id}, {container}) => {
      const rolesAggregate = container.resolve<IRolesAggregate>(TYPES.RolesAggregate)
      return rolesAggregate.getRole(id)
    },
  },
  Mutation: {
    createRole: async (_parent, {input}, {container, user}) => {
      const createRoleCommand = new CreateRoleCommand({...input, account: user.account.id})

      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateRoleCommand, RoleDocument>(CommandType.CREATE_ROLE_COMMAND, createRoleCommand)
    },
    updateRole: async (_parent, {id, input}, {container}) => {
      const updateRoleCommand = new UpdateRoleCommand(id, input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateRoleCommand, RoleDocument>(CommandType.UPDATE_ROLE_COMMAND, updateRoleCommand)
    },
    deleteRole: async (_parent, {id}, {container}) => {
      const deleteRoleCommand = new DeleteRoleCommand(id)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<DeleteRoleCommand, RoleDocument>(CommandType.DELETE_ROLE_COMMAND, deleteRoleCommand)
    },
  },
}

export const schema = {typeDefs, resolvers}
