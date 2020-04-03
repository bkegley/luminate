import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Variety {
    id: ID!
    name: String!
    background: String
    coffees: [Coffee]
    createdAt: String!
    updatedAt: String!
  }

  type VarietyConnection {
    pageInfo: PageInfo!
    edges: [VarietyEdge!]!
  }

  type VarietyEdge {
    cursor: String!
    node: Variety!
  }

  input CreateVarietyInput {
    name: String!
  }

  input UpdateVarietyInput {
    name: String
  }

  extend type Query {
    listVarieties(cursor: String, limit: Int, query: [QueryInput!]): VarietyConnection!
    getVariety(id: ID!): Variety
  }

  extend type Mutation {
    createVariety(input: CreateVarietyInput!): Variety
    updateVariety(id: ID!, input: UpdateVarietyInput!): Variety
    deleteVariety(id: ID!): Variety
    makeVarietyPublic(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listVarieties: async (parent, args, {services}) => {
      return services.variety.getConnectionResults(args)
    },
    getVariety: async (parent, {id}, {services}) => {
      return services.variety.getById(id)
    },
  },
  Mutation: {
    createVariety: async (parent, {input}, {services}) => {
      return services.variety.create(input)
    },
    updateVariety: async (parent, {id, input}, {services}) => {
      return services.variety.updateById(id, input)
    },
    deleteVariety: async (parent, {id}, {services}) => {
      return services.variety.deleteById(id)
    },
    makeVarietyPublic: async (parent, {id}, {services}) => {
      // TODO: implement this
      return false
      // const {Variety} = models
      // const variety = await Variety.makeEntityPublicByUser(user, id)
      // return !!variety
    },
  },
  Variety: {
    coffees: async (parent, args, {services}) => {
      return services.coffee.listByVarietyId(parent.id)
    },
  },
}

export const schema = {typeDefs, resolvers}
