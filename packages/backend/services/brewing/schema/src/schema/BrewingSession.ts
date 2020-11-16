import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {
  CreateBrewingSessionCommand,
  ICommandRegistry,
  CommandType,
  UpdateBrewingSessionCommand,
  DeleteBrewingSessionCommand,
} from '../commands'
import {TYPES} from '../utils'
import {BrewingSession} from '../domain/BrewingSession'
import {BrewingSessionMapper} from '../mappers'
import {IBrewingSessionsView} from '../views'

const typeDefs = gql`
  type BrewingSession {
    id: ID!
    date: String
    description: String
  }

  type BrewingSessionConnection {
    pageInfo: PageInfo
    edges: [BrewingSessionEdge]
  }

  type BrewingSessionEdge {
    cursor: String
    node: BrewingSession
  }

  input CreateBrewingSessionInput {
    date: String
    description: String
  }

  input UpdateBrewingSessionInput {
    date: String
    description: String
  }

  extend type Query {
    listBrewingSessions: BrewingSessionConnection
    getBrewingSession(id: ID!): BrewingSession
  }

  extend type Mutation {
    createBrewingSession(input: CreateBrewingSessionInput): BrewingSession
    updateBrewingSession(id: ID!, input: UpdateBrewingSessionInput): BrewingSession
    deleteBrewingSession(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listBrewingSessions: async (parent, args, {container}) => {
      const brewingSessionsView = container.resolve<IBrewingSessionsView>(TYPES.BrewingSessionsView)
      return brewingSessionsView.listBrewingSessions()
    },
    getBrewingSession: async (parent, {id}, {container}) => {
      const brewingSessionsView = container.resolve<IBrewingSessionsView>(TYPES.BrewingSessionsView)
      return brewingSessionsView.getBrewingSessionById(id)
    },
  },
  Mutation: {
    createBrewingSession: async (parent, {input}, {container}) => {
      const createBrewingSessionCommand = new CreateBrewingSessionCommand(input)
      const brewingSession = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateBrewingSessionCommand, BrewingSession>(
          CommandType.CREATE_BREWING_SESSION_COMMAND,
          createBrewingSessionCommand,
        )
      return BrewingSessionMapper.toDTO(brewingSession)
    },
    updateBrewingSession: async (parent, {id, input}, {container}) => {
      const updateBrewingSessionCommand = new UpdateBrewingSessionCommand(id, input)
      const brewingSession = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateBrewingSessionCommand, BrewingSession>(
          CommandType.UPDATE_BREWING_SESSION_COMMAND,
          updateBrewingSessionCommand,
        )
      return BrewingSessionMapper.toDTO(brewingSession)
    },
    deleteBrewingSession: async (parent, {id}, {container}) => {
      const deleteBrewingSessionCommand = new DeleteBrewingSessionCommand(id)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<UpdateBrewingSessionCommand, boolean>(
          CommandType.DELETE_BREWING_SESSION_COMMAND,
          deleteBrewingSessionCommand,
        )
    },
  },
}

export const schema = {typeDefs, resolvers}
