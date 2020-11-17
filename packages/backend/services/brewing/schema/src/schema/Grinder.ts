import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {
  ICommandRegistry,
  CommandType,
  CreateGrinderCommand,
  UpdateGrinderCommand,
  DeleteGrinderCommand,
  ICreateGrinderCommandHandler,
  IUpdateGrinderCommandHandler,
  IDeleteGrinderCommandHandler,
} from '../commands'
import {TYPES} from '../utils'
import {GrinderMapper} from '../mappers'
import {IGrindersView} from '../views'

const typeDefs = gql`
  type Grinder {
    id: ID!
    name: String
    description: String
    burrSet: BurrSet
  }

  enum BurrSet {
    CONICAL_BURR
    FLAT_BURR
    BLADE
  }

  type GrinderConnection {
    pageInfo: PageInfo!
    edges: [GrinderEdge!]!
  }

  type GrinderEdge {
    cursor: String
    node: Grinder
  }

  input CreateGrinderInput {
    name: String
    description: String
    burrSet: BurrSet
  }

  input UpdateGrinderInput {
    name: String
    description: String
    burrSet: BurrSet
  }

  extend type Query {
    listGrinders: GrinderConnection!
    getGrinder(id: ID!): Grinder
  }

  extend type Mutation {
    createGrinder(input: CreateGrinderInput!): Grinder
    updateGrinder(id: ID!, input: UpdateGrinderInput!): Grinder
    deleteGrinder(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listGrinders: async (_parent, _args, {container}) => {
      const grindersView = container.resolve<IGrindersView>(TYPES.GrindersView)
      return grindersView.listGrinders()
    },
    getGrinder: async (_parent, {id}, {container}) => {
      const grindersView = container.resolve<IGrindersView>(TYPES.GrindersView)
      return grindersView.getGrinderById(id)
    },
  },
  Mutation: {
    createGrinder: async (_parent, {input}, {container}) => {
      const createGrinderCommand = new CreateGrinderCommand(input)

      const grinder = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<ICreateGrinderCommandHandler>(CommandType.CREATE_GRINDER_COMMAND, createGrinderCommand)

      return GrinderMapper.toDTO(grinder)
    },
    updateGrinder: async (_parent, {id, input}, {container}) => {
      const updateGrinderCommand = new UpdateGrinderCommand(id, input)

      const grinder = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IUpdateGrinderCommandHandler>(CommandType.UPDATE_GRINDER_COMMAND, updateGrinderCommand)

      return GrinderMapper.toDTO(grinder)
    },
    deleteGrinder: async (_parent, {id}, {container}) => {
      const deleteGrinderCommand = new DeleteGrinderCommand(id)

      const grinder = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IDeleteGrinderCommandHandler>(CommandType.DELETE_GRINDER_COMMAND, deleteGrinderCommand)

      return !!grinder
    },
  },
}

export const schema = {typeDefs, resolvers}
