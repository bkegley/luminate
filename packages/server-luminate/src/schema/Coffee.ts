import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers, Coffee, Variety} from '../types'

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
    getCoffee: async (parent, {id}, {loaders}, info) => {
      const {coffees} = loaders
      return coffees.load(id)
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
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {region} = loaders
      return region.load(parent.region)
    },
    varieties: async (parent, args, {models, loaders}) => {
      const {varietiesOfCoffee} = loaders
      return varietiesOfCoffee.load(parent.varieties)
    },
  },
}

export interface CoffeeLoaders {
  coffees: LoaderFn<Coffee>
  varietiesOfCoffee: LoaderFn<Variety[]>
}

export const loaders: CoffeeLoaders = {
  coffees: async (ids, models: any) => {
    const {Coffee} = models
    const coffees = await Coffee.find({_id: ids})
    return ids.map(id => coffees.find((coffee: any) => coffee._id.toString() === id.toString()))
  },
  varietiesOfCoffee: async (ids, models: any) => {
    const {Variety} = models
    const varieties = await Variety.find({_id: ids.flat(Infinity)})

    return ids.map(id => {
      return varieties.filter((variety: any) => id.includes(variety.id))
    })
  },
}
