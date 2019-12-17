import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

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

  input CreateCoffeeInput {
    name: String
    country: ID
    region: ID
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
  }

  input UpdateCoffeeInput {
    name: String
    country: ID
    region: ID
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
  }

  extend type Query {
    listCoffees(cursor: String, limit: Int, query: [QueryInput]): CoffeeConnection!
    getCoffee(id: ID!): Coffee
  }

  extend type Mutation {
    createCoffee(input: CreateCoffeeInput!): Coffee
    updateCoffee(id: ID!, input: UpdateCoffeeInput!): Coffee
    deleteCoffee(id: ID!): Coffee
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
    updateCoffee: async (parent, {id, input}, {models}) => {
      const {Coffee} = models
      const coffee = await Coffee.findByIdAndUpdate(id, input, {new: true})
      return coffee
    },
    deleteCoffee: async (parent, {id}, {models}) => {
      const {Coffee} = models
      const coffee = await Coffee.findByIdAndDelete(id)
      return coffee
    },
  },
  Coffee: {
    country: async (parent, args, {models}) => {
      const {Country} = models
      const country = await Country.findById(parent.country)
      return country
    },
    region: async (parent, args, {models}) => {
      const {Region} = models
      const region = await Region.findById(parent.region)
      return region
    },
    varieties: async (parent, args, {models}) => {
      const {Variety} = models
      const varieties = await Variety.find({_id: parent.varieties})
      return varieties
    },
  },
}
