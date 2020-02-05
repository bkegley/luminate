import {gql, ApolloError} from 'apollo-server-express'
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
    listCuppings: async (parent, args, {models, user}) => {
      const {Cupping} = models
      const results = await createConnectionResults({user, args, model: Cupping})
      return results
    },
    getCupping: async (parent, {id}, {loaders}, info) => {
      const {cuppings} = loaders
      return cuppings.load(id)
    },
  },
  Mutation: {
    createCupping: async (parent, {input}, {models, user}) => {
      const {Cupping} = models
      const cupping = await Cupping.createByUser(user, input)
      return cupping
    },
    updateCupping: async (parent, {id, input}, {models, user}) => {
      const {Cupping} = models
      const cupping = await Cupping.findByIdAndUpdateByUser(user, id, input, {new: true})
      return cupping
    },
    deleteCupping: async (parent, {id}, {models, user}) => {
      const {Cupping} = models
      const cupping = await Cupping.findByIdAndDeleteByUser(user, id, {})
      if (!cupping) {
        throw new ApolloError('Document not found')
      }
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
  cuppings: async (ids, models, user) => {
    const {Cupping} = models
    const cuppings = await Cupping.findByUser(user, {_id: ids})
    return ids.map(id => {
      const cupping = cuppings.find(cupping => cupping._id.toString() === id.toString())
      if (!cupping) return null
      return cupping
    })
  },
}

export const schema = {typeDefs, resolvers}
