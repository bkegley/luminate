import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType, CreateBrewerCommand, UpdateBrewerCommand, DeleteBrewerCommand} from '../commands'
import {TYPES} from '../utils'

const typeDefs = gql`
  type Brewer {
    id: ID!
    name: String
  }

  type BrewerConnection {
    pageInfo: PageInfo!
    edges: [BrewerEdge!]!
  }

  type BrewerEdge {
    cursor: String
    node: Brewer
  }

  input CreateBrewerInput {
    name: String
  }

  input UpdateBrewerInput {
    name: String
  }

  extend type Query {
    listBrewers: BrewerConnection!
    getBrewer(id: ID!): Brewer
  }

  extend type Mutation {
    createBrewer(input: CreateBrewerInput!): Brewer
    updateBrewer(id: ID!, input: UpdateBrewerInput!): Brewer
    deleteBrewer(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listBrewers: async (_parent, _args, {}) => {
      return {
        pageInfo: {
          hasNextPage: false,
          nextCursor: '',
        },
        edges: [],
      }
    },
    getBrewer: async (_parent, {id}, {}) => {
      return null
    },
  },
  Mutation: {
    createBrewer: async (_parent, {input}, {container}) => {
      const createBrewerCommand = new CreateBrewerCommand(input)

      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process(CommandType.CREATE_BREWER_COMMAND, createBrewerCommand)
    },
    updateBrewer: async (_parent, {id, input}, {container}) => {
      const updateBrewerCommand = new UpdateBrewerCommand(id, input)

      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process(CommandType.UPDATE_BREWER_COMMAND, updateBrewerCommand)
    },
    deleteBrewer: async (_parent, {id}, {container}) => {
      const deleteBrewerCommand = new DeleteBrewerCommand(id)

      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process(CommandType.DELETE_BREWER_COMMAND, deleteBrewerCommand)
    },
  },
}

export const schema = {typeDefs, resolvers}
