import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CuppingDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Cupping @key(fields: "id") {
    id: ID!
    description: String
    coffees: [CuppingCoffee]
    createdAt: String
    updatedAt: String
  }

  type CuppingCoffee {
    sessionCoffeeId: ID!
    coffee: Coffee!
  }

  extend type Coffee @key(fields: "id") {
    id: ID! @external
  }

  type CuppingConnection {
    pageInfo: PageInfo!
    edges: [CuppingEdge!]!
  }

  type CuppingEdge {
    cursor: String
    node: Cupping
  }

  input CreateCuppingInput {
    description: String
  }

  input UpdateCuppingInput {
    description: String
    coffees: [CuppingCoffeeInput]
  }

  input CuppingCoffeeInput {
    sessionCoffeeId: ID!
    coffee: ID
  }

  extend type Query {
    listCuppings(cursor: String, limit: Int, query: [QueryInput]): CuppingConnection!
    getCupping(id: ID!): Cupping
  }

  extend type Mutation {
    createCupping(input: CreateCuppingInput!): Cupping
    updateCupping(id: ID!, input: UpdateCuppingInput!): Cupping
    deleteCupping(id: ID!): Cupping
  }
`

const resolvers: Resolvers = {
  Query: {
    listCuppings: async (parent, args, {models}) => {
      const {Cupping} = models
      const results = await createConnectionResults({args, model: Cupping})
      return results
    },
    getCupping: async (parent, {id}, {loaders}, info) => {
      const {cuppings} = loaders
      return cuppings.load(id)
    },
  },
  Mutation: {
    createCupping: async (parent, {input}, {models}) => {
      const {Cupping} = models
      const cupping = await new Cupping(input).save()
      return cupping
    },
    updateCupping: async (parent, {id, input}, {models}) => {
      const {Cupping} = models
      const cupping = await Cupping.findByIdAndUpdate(id, input, {new: true})
      return cupping
    },
    deleteCupping: async (parent, {id}, {models}) => {
      const {Cupping} = models
      const cupping = await Cupping.findByIdAndDelete(id)
      return cupping
    },
  },
  CuppingCoffee: {
    coffee: parent => {
      return {__typename: 'Coffee', id: parent.coffee}
    },
  },
}

export interface CuppingLoaders {
  cuppings: LoaderFn<CuppingDocument>
}

export const loaders: CuppingLoaders = {
  cuppings: async (ids, models) => {
    const {Cupping} = models
    const cuppings = await Cupping.find({_id: ids})
    return ids.map(id => {
      const cupping = cuppings.find(cupping => cupping._id.toString() === id.toString())
      if (!cupping) throw new Error('Document not found')
      return cupping
    })
  },
}

export const schema = {typeDefs, resolvers}
