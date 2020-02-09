import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {VarietyDocument} from '@luminate/mongo'

const typeDefs = gql`
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
    makeVarietyPublic(id: ID!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listVarieties: async (parent, args, {models, user}) => {
      const {Variety} = models

      const results = await createConnectionResults({user, args, model: Variety})
      return results
    },
    getVariety: async (parent, {id}, {loaders}, info) => {
      const {varieties} = loaders
      return varieties.load(id)
    },
  },
  Mutation: {
    createVariety: async (parent, {input}, {models, user}) => {
      const {Variety} = models
      const variety = await Variety.createByUser(user, input)
      return variety
    },
    updateVariety: async (parent, {id, input}, {models, user}) => {
      const {Variety} = models
      const variety = await Variety.findByIdAndUpdateByUser(user, id, input, {new: true})
      return variety
    },
    deleteVariety: async (parent, {id}, {models, user}) => {
      const {Variety} = models
      const variety = await Variety.findByIdAndDeleteByUser(user, id, {})
      if (!variety) {
        throw new ApolloError('Document not found')
      }
      return variety
    },
    makeVarietyPublic: async (parent, {id}, {models, user}) => {
      const {Variety} = models
      const variety = await Variety.makeEntityPublicByUser(user, id)
      return !!variety
    },
  },
  Variety: {
    coffees: async (parent, args, {models, user}) => {
      const {Coffee} = models
      const coffees = await Coffee.findByUser(user, {varieties: parent.id})
      return coffees
    },
  },
}

export interface VarietyLoaders {
  varieties: LoaderFn<VarietyDocument>
}

export const loaders: VarietyLoaders = {
  varieties: async (ids, models, user) => {
    const {Variety} = models
    const varieties = await Variety.findByUser(user, {_id: ids})
    return ids.map(id => {
      const variety = varieties.find((variety: any) => variety._id.toString() === id.toString())
      if (!variety) return null
      return variety
    })
  },
}

export const schema = {typeDefs, resolvers}
