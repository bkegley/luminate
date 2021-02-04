import {gql} from 'apollo-server-express'
import {Resolvers} from '../../types'
import {
  CreateBrewingSessionCommand,
  ICommandRegistry,
  CommandType,
  UpdateBrewingSessionCommand,
  DeleteBrewingSessionCommand,
  IUpdateBrewingSessionCommandHandler,
  ICreateBrewingSessionCommandHandler,
  IDeleteBrewingSessionCommandHandler,
} from '../commands'
import {TYPES} from '../../utils'
import {BrewingSessionMapper} from '../../infra/mappers'
import {IBrewingSessionsView} from '../../infra/views'

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
        .process<ICreateBrewingSessionCommandHandler>(
          CommandType.CREATE_BREWING_SESSION_COMMAND,
          createBrewingSessionCommand,
        )
      return BrewingSessionMapper.toDTO(brewingSession)
    },
    updateBrewingSession: async (parent, {id, input}, {container}) => {
      const updateBrewingSessionCommand = new UpdateBrewingSessionCommand(id, input)
      const brewingSession = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IUpdateBrewingSessionCommandHandler>(
          CommandType.UPDATE_BREWING_SESSION_COMMAND,
          updateBrewingSessionCommand,
        )
      return BrewingSessionMapper.toDTO(brewingSession)
    },
    deleteBrewingSession: async (parent, {id}, {container}) => {
      const deleteBrewingSessionCommand = new DeleteBrewingSessionCommand(id)
      const brewingSession = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IDeleteBrewingSessionCommandHandler>(
          CommandType.DELETE_BREWING_SESSION_COMMAND,
          deleteBrewingSessionCommand,
        )
      return !!brewingSession
    },
  },
}

export const schema = {typeDefs, resolvers}
