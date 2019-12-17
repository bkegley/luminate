import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Region {
    id: ID!
    name: String
    country: Country
    farms: [Farm]
    createdAt: String
    updatedAt: String
  }

  type RegionConnection {
    pageInfo: PageInfo!
    edges: [RegionEdge!]!
  }

  type RegionEdge {
    cursor: String
    node: Region
  }

  input CreateRegionInput {
    name: String
    country: ID
  }

  input UpdateRegionInput {
    name: String
    country: ID
  }

  extend type Query {
    listRegions(cursor: String, limit: Int, query: [QueryInput]): RegionConnection!
    getRegion(id: ID!): Region
  }

  extend type Mutation {
    createRegion(input: CreateRegionInput!): Region
    updateRegion(id: ID!, input: UpdateRegionInput!): Region
    deleteRegion(id: ID!): Region
  }
`

export const resolvers: Resolvers = {
  Query: {
    listRegions: async (parent, args, {models}) => {
      const {Region} = models

      const results = await createConnectionResults({args, model: Region})
      return results
    },
    getRegion: async (parent, {id}, {models}, info) => {
      const {Region} = models
      const region = await Region.findById(id)
      return region
    },
  },
  Mutation: {
    createRegion: async (parent, {input}, {models}) => {
      const {Region} = models
      const region = await new Region(input).save()
      return region
    },
    updateRegion: async (parent, {id, input}, {models}) => {
      const {Region} = models
      const region = await Region.findByIdAndUpdate(id, input, {new: true})
      return region
    },
    deleteRegion: async (parent, {id}, {models}) => {
      const {Region} = models
      const region = await Region.findByIdAndDelete(id)
      return region
    },
  },
  Region: {
    country: async (parent, args, {models}) => {
      const {Country} = models
      const country = await Country.findById(parent.country)
      return country
    },
    farms: async (parent, args, {models}) => {
      const {Farm} = models
      const farms = await Farm.find({region: parent.id})
      return farms
    },
  },
}
