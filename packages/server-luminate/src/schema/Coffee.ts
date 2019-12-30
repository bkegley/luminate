import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CoffeeDocument, VarietyDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Coffee @key(fields: "id") {
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

const resolvers: Resolvers = {
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
    __resolveReference: (object, {loaders}) => {
      const {coffees} = loaders
      return coffees.load(object.id)
    },
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      if (!parent.country) return null
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {regions} = loaders
      if (!parent.region) return null
      return regions.load(parent.region)
    },
    varieties: async (parent, args, {models, loaders}) => {
      const {varietiesOfCoffee} = loaders
      if (!parent.varieties) return null
      return Promise.all(parent.varieties.map(id => varietiesOfCoffee.load(id)))
    },
  },
}

export interface CoffeeLoaders {
  coffees: LoaderFn<CoffeeDocument>
  varietiesOfCoffee: LoaderFn<VarietyDocument>
}

export const loaders: CoffeeLoaders = {
  coffees: async (ids, models) => {
    const {Coffee} = models
    const coffees = await Coffee.find({_id: ids})
    return ids.map(id => {
      const coffee = coffees.find(coffee => coffee._id.toString() === id.toString())
      if (!coffee) throw new Error('Document not found')
      return coffee
    })
  },
  varietiesOfCoffee: async (ids, models) => {
    const {Variety} = models
    const varieties = await Variety.find({_id: ids})
    return ids.map(id => {
      const variety = varieties.find(variety => variety._id.toString() === id.toString())
      if (!variety) throw new Error('Document not found')
      return variety
    })
  },
}

export const schema = {typeDefs, resolvers}
