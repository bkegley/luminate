import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {
  CreateEvaluationCommand,
  ICommandRegistry,
  CommandType,
  UpdateEvaluationCommand,
  DeleteEvaluationCommand,
  ICreateEvaluationCommandHandler,
  IUpdateEvaluationCommandHandler,
  IDeleteEvaluationCommandHandler,
} from '../commands'
import {TYPES} from '../utils'
import {EvaluationMapper} from '../mappers'
import {IEvaluationsView} from '../views'

const typeDefs = gql`
  type Evaluation {
    id: ID!
    date: String
  }

  type EvaluationConnection {
    pageInfo: PageInfo
    edges: [EvaluationEdge]
  }

  type EvaluationEdge {
    cursor: String
    node: Evaluation
  }

  input CreateEvaluationInput {
    date: String
  }

  input UpdateEvaluationInput {
    date: String
  }

  extend type Query {
    listEvaluations: EvaluationConnection
    getEvaluation(id: ID!): Evaluation
  }

  extend type Mutation {
    createEvaluation(input: CreateEvaluationInput): Evaluation
    updateEvaluation(id: ID!, input: UpdateEvaluationInput): Evaluation
    deleteEvaluation(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listEvaluations: async (parent, args, {container}) => {
      const evaluationsView = container.resolve<IEvaluationsView>(TYPES.EvaluationsView)
      return evaluationsView.listEvaluations()
    },
    getEvaluation: async (parent, {id}, {container}) => {
      const evaluationsView = container.resolve<IEvaluationsView>(TYPES.EvaluationsView)
      return evaluationsView.getEvaluation(id)
    },
  },
  Mutation: {
    createEvaluation: async (parent, {input}, {container}) => {
      const createEvaluationCommand = new CreateEvaluationCommand(input)
      const evaluation = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<ICreateEvaluationCommandHandler>(CommandType.CREATE_EVALUATION_COMMAND, createEvaluationCommand)
      return EvaluationMapper.toDTO(evaluation)
    },
    updateEvaluation: async (parent, {id, input}, {container}) => {
      const updateEvaluationCommand = new UpdateEvaluationCommand(id, input)
      const evaluation = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IUpdateEvaluationCommandHandler>(CommandType.UPDATE_EVALUATION_COMMAND, updateEvaluationCommand)
      return EvaluationMapper.toDTO(evaluation)
    },
    deleteEvaluation: async (parent, {id}, {container}) => {
      const deleteEvaluationCommand = new DeleteEvaluationCommand(id)
      const evaluation = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<IDeleteEvaluationCommandHandler>(CommandType.DELETE_EVALUATION_COMMAND, deleteEvaluationCommand)

      return !!evaluation
    },
  },
}

export const schema = {typeDefs, resolvers}
