import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType, CreateBrewGuideCommand, ICreateBrewGuideCommandHandler} from '../commands'
import {TYPES} from '../utils'
import {IBrewGuidesView} from '../views'
import {BrewGuideMapper} from '../mappers'

const typeDefs = gql`
  type BrewGuide {
    id: ID!
    name: String
    recipe: Recipe
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
    recipeId: ID!
  }

  input UpdateBrewGuideInput {
    name: String
    recipeId: ID
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
      const brewGuide = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<ICreateBrewGuideCommandHandler>(CommandType.CREATE_BREW_GUIDE_COMMAND, createBrewGuideCommand)

      return BrewGuideMapper.toDTO(brewGuide)
    },
  },
}

export const schema = {typeDefs, resolvers}
