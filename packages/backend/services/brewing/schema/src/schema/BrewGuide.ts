import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType, CreateBrewGuideCommand} from '../commands'
import {TYPES} from '../utils'
import {IBrewGuidesView} from '../views'

const typeDefs = gql`
  type BrewGuide {
    id: ID!
    name: String
  }

  type BrewGuideConnection {
    pageInfo: PageInfo!
    edges: [BrewGuideEdge]
  }

  type BrewGuideEdge {
    cursor: String!
    node: BrewGuide!
  }

  extend type Query {
    listBrewGuides: BrewGuideConnection!
    getBrewGuide(id: ID!): BrewGuide
  }

  input CreateBrewGuideInput {
    name: String!
  }

  input UpdateBrewGuideInput {
    name: String
  }

  extend type Mutation {
    createBrewGuide(input: CreateBrewGuideInput!): BrewGuide
    updateBrewGuide(id: ID!, input: UpdateBrewGuideInput!): BrewGuide
    deleteBrewGuide(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listBrewGuides: async (parent, args, {container}) => {
      const brewGuidesView = container.resolve<IBrewGuidesView>(TYPES.BrewGuidesView)
      return brewGuidesView.listBrewGuides()
    },
    getBrewGuide: async (parent, {id}, {container}) => {
      const brewGuidesView = container.resolve<IBrewGuidesView>(TYPES.BrewGuidesView)
      return brewGuidesView.getBrewGuideById(id)
    },
  },
  Mutation: {
    createBrewGuide: async (parent, {input}, {container}) => {
      const createBrewGuideCommand = new CreateBrewGuideCommand(input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process(CommandType.CREATE_BREW_GUIDE_COMMAND, createBrewGuideCommand)
    },
  },
}

export const schema = {typeDefs, resolvers}
