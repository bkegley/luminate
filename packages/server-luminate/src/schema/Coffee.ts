import {gql} from 'apollo-server-express'
import {Coffee, Resolvers} from '../types'
import {createCursorHash, parseArgs} from '@luminate/graphql-utils'

export const typeDefs = gql`
  type Coffee {
    id: ID!
    name: String
    country: Country
    region: Region
    varieties: [Variety]
    elevation: String
    createdAt: String
    updatedAt: String
  }

  type CoffeeConnection {
    pageInfo: PageInfo!
    edges: [CoffeeEdge!]!
  }

  type CoffeeEdge {
    cursor: String
    node: Coffee
  }

  input CreateCoffeeCoffeeInput {
    name: String
    region: ID
  }

  extend type Query {
    listCoffees(cursor: String, limit: Int, query: [QueryInput]): CoffeeConnection!
    getCoffee(id: ID!): Coffee
  }

  extend type Mutation {
    createCoffee(input: CreateCoffeeCoffeeInput!): Coffee
  }
`

export const resolvers: Resolvers = {
  Query: {
    listCoffees: async (parent, args, {models}) => {
      const cursor = args.cursor || createCursorHash(new Date())
      const limit = args.limit || 100
      const query = args.query

      const {Coffee} = models

      const coffeesPlusOne = await Coffee.find({...parseArgs({cursor, query})}, null, {
        sort: '-updatedAt',
        limit: limit ? limit + 1 : 100 + 1,
      })

      if (!coffeesPlusOne.length) {
        return {
          pageInfo: {
            hasNextPage: false,
            nextCursor: null,
            previousCursor: '',
          },
          edges: [],
        }
      }

      const hasNextPage = coffeesPlusOne.length > limit
      const coffees = hasNextPage ? coffeesPlusOne.slice(0, -1) : coffeesPlusOne
      const nextCursor = hasNextPage ? createCursorHash(coffeesPlusOne[coffeesPlusOne.length - 1].updatedAt) : null

      const data = {
        pageInfo: {
          hasNextPage,
          nextCursor,
          previousCursor: '',
        },
        edges: coffees.map((coffee: any) => {
          return {
            node: coffee,
            cursor: createCursorHash(coffee.updatedAt),
          }
        }),
      }

      return data
    },
    getCoffee: async (parent, {id}, {models}, info) => {
      const {Coffee} = models
      const coffee = await Coffee.findById(id)
      return coffee
    },
  },
  Mutation: {
    createCoffee: async (parent, {input}, {models}) => {
      const {Coffee} = models
      const coffee = await new Coffee(input).save()
      return coffee
    },
  },
  Coffee: {
    country: async (parent, args, {models}) => {
      const {Country} = models
      const country = await Country.findById(parent.country)
      return country
    },
  },
}
