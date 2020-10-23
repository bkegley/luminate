import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {ICommandRegistry, CommandType} from '../commands'
import {TYPES} from '../utils'
import {CreateRecipeCommand} from '../commands/Recipe/CreateRecipeCommand'
import {RecipeMapper} from '../mappers'
import {Recipe} from '../domain/Recipe'

const typeDefs = gql`
  type Recipe {
    id: ID!
    name: String!
    grinder: Grinder!
    grindSetting: Int
    brewer: Brewer!
    instructions: [String]
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
    instructions: [String]
  }

  input UpdateRecipeInput {
    name: String!
    brewerId: ID!
    grinderId: ID!
    grindSetting: Int
    instructions: [String]
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
      console.log('we are here')
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
    //@ts-ignore
    createRecipe: async (parent, {input}, {container}) => {
      const createRecipeCommand = new CreateRecipeCommand(input)
      return container
        .resolve<ICommandRegistry>(TYPES.CommandRegistry)
        .process<CreateRecipeCommand, Recipe>(CommandType.CREATE_RECIPE_COMMAND, createRecipeCommand)
    },
  },
}
export const schema = {typeDefs, resolvers}
