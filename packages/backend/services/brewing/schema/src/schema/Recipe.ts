import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType, ICreateRecipeCommandHandler, CreateRecipeCommand} from '../commands'
import {TYPES} from '../utils'
import {RecipeMapper, BrewerMapper, GrinderMapper} from '../mappers'
import {Recipe} from '../domain/Recipe'
import {RecipeDTO} from '../dtos'

const typeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
    grinder: Grinder!
    grindSetting: Int
    brewer: Brewer!
    note: String
  }

  type RecipeConnection {
    pageInfo: PageInfo
    edges: [RecipeEdge]
  }

  type RecipeEdge {
    cursor: String
    node: Recipe
  }

  input CreateRecipeInput {
    name: String!
    brewerId: ID!
    grinderId: ID!
    grindSetting: Int
    note: String
  }

  input UpdateRecipeInput {
    name: String!
    brewerId: ID!
    grinderId: ID!
    grindSetting: Int
    note: String
  }

  extend type Query {
    listRecipes: RecipeConnection!
    getRecipe(id: ID!): Recipe
  }

  extend type Mutation {
    createRecipe(input: CreateRecipeInput): Recipe
    updateRecipe(id: ID!, input: UpdateRecipeInput): Recipe
    deleteRecipe(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listRecipes: async (parent, args, context) => {
      return {
        pageInfo: {
          hasNextPage: false,
          nextCursor: 'yes',
          prevCursor: 'no',
        },
        edges: [],
      }
    },
  },
  Mutation: {
    createRecipe: async (parent, {input}, {container}) => {
      const createRecipeCommand = new CreateRecipeCommand(input)
      const response = await container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<ICreateRecipeCommandHandler>(CommandType.CREATE_RECIPE_COMMAND, createRecipeCommand)

      const [recipe, brewer, grinder] = [
        RecipeMapper.toDTO(response.recipe),
        BrewerMapper.toDTO(response.brewer),
        GrinderMapper.toDTO(response.grinder),
      ]

      return {
        ...(recipe as Required<RecipeDTO>),
        grinder,
        brewer,
      }
    },
  },
}
export const schema = {typeDefs, resolvers}
