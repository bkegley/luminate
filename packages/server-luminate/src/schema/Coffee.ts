import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {createConnectionResults} from '@luminate/graphql-utils'

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
      const {Coffee} = models

      const results = await createConnectionResults({args, model: Coffee})
      return results
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
