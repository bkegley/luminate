import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Variety {
    id: ID!
    name: String
    background: String
    coffees: [Coffee]
    createdAt: String
    updatedAt: String
  }

  type VarietyConnection {
    pageInfo: PageInfo!
    edges: [VarietyEdge!]!
  }

  type VarietyEdge {
    cursor: String
    node: Variety
  }

  input CreateVarietyInput {
    name: String
  }

  input UpdateVarietyInput {
    name: String
  }

  extend type Query {
    listVarieties(cursor: String, limit: Int, query: [QueryInput]): VarietyConnection!
    getVariety(id: ID!): Variety
  }

  extend type Mutation {
    createVariety(input: CreateVarietyInput!): Variety
    updateVariety(id: ID!, input: UpdateVarietyInput!): Variety
    deleteVariety(id: ID!): Variety
  }
`

export const resolvers: Resolvers = {
  Query: {
    listVarieties: async (parent, args, {models}) => {
      const {Variety} = models

      const results = await createConnectionResults({args, model: Variety})
      return results
    },
    getVariety: async (parent, {id}, {models}, info) => {
      const {Variety} = models
      const variety = await Variety.findById(id)
      return variety
    },
  },
  Mutation: {
    createVariety: async (parent, {input}, {models}) => {
      const {Variety} = models
      const variety = await new Variety(input).save()
      return variety
    },
    updateVariety: async (parent, {id, input}, {models}) => {
      const {Variety} = models
      const variety = await Variety.findByIdAndUpdate(id, input, {new: true})
      return variety
    },
    deleteVariety: async (parent, {id}, {models}) => {
      const {Variety} = models
      const variety = await Variety.findByIdAndDelete(id)
      return variety
    },
  },
  Variety: {
    coffees: async (parent, args, {models}) => {
      const {Coffee} = models
      const coffees = await Coffee.find({varieties: parent.id})
      return coffees
    },
  },
}
