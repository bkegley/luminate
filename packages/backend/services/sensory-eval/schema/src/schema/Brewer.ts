import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType, CreateBrewerCommand, UpdateBrewerCommand, DeleteBrewerCommand} from '../commands'
import {TYPES} from '../utils'
import {IBrewersView} from '../views'
import {Brewer} from '../domain/Brewer'
import {BrewerMapper} from '../mappers/BrewerMapper'

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
    listBrewers: async (_parent, _args, {container}) => {
      const brewersView = container.resolve<IBrewersView>(TYPES.BrewersView)
      return brewersView.listBrewers()
    },
    getBrewer: async (_parent, {id}, {container}) => {
      const brewersView = container.resolve<IBrewersView>(TYPES.BrewersView)
      return brewersView.getBrewerById(id)
    },
  },
  Mutation: {
    createBrewer: async (_parent, {input}, {container}) => {
      const createBrewerCommand = new CreateBrewerCommand(input)

      const brewer = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateBrewerCommand, Brewer>(CommandType.CREATE_BREWER_COMMAND, createBrewerCommand)

      return BrewerMapper.toDTO(brewer)
    },
    updateBrewer: async (_parent, {id, input}, {container}) => {
      const updateBrewerCommand = new UpdateBrewerCommand(id, input)

      const brewer = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateBrewerCommand, Brewer>(CommandType.UPDATE_BREWER_COMMAND, updateBrewerCommand)

      return BrewerMapper.toDTO(brewer)
    },
    deleteBrewer: async (_parent, {id}, {container}) => {
      const deleteBrewerCommand = new DeleteBrewerCommand(id)

      const brewer = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process(CommandType.DELETE_BREWER_COMMAND, deleteBrewerCommand)

      if (!brewer) {
        return false
      }
      return true
    },
  },
}

export const schema = {typeDefs, resolvers}
