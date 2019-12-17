import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type FarmZone {
    id: ID!
    name: String
    country: Country
    region: Region
    farm: Farm
    createdAt: String
    updatedAt: String
  }

  type FarmZoneConnection {
    pageInfo: PageInfo!
    edges: [FarmZoneEdge!]!
  }

  type FarmZoneEdge {
    cursor: String
    node: FarmZone
  }

  input CreateFarmZoneInput {
    name: String
    farm: ID
  }

  input UpdateFarmZoneInput {
    name: String
    farm: ID
  }

  extend type Query {
    listFarmZones(cursor: String, limit: Int, query: [QueryInput]): FarmZoneConnection!
    getFarmZone(id: ID!): FarmZone
  }

  extend type Mutation {
    createFarmZone(input: CreateFarmZoneInput!): FarmZone
    updateFarmZone(id: ID!, input: UpdateFarmZoneInput!): FarmZone
    deleteFarmZone(id: ID!): FarmZone
  }
`

export const resolvers: Resolvers = {
  Query: {
    listFarmZones: async (parent, args, {models}) => {
      const {FarmZone} = models

      const results = await createConnectionResults({args, model: FarmZone})
      return results
    },
    getFarmZone: async (parent, {id}, {models}, info) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.findById(id)
      return farmZone
    },
  },
  Mutation: {
    createFarmZone: async (parent, {input}, {models}) => {
      const {FarmZone} = models
      const farmZone = await new FarmZone(input).save()
      return farmZone
    },
    updateFarmZone: async (parent, {id, input}, {models}) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.findByIdAndUpdate(id, input, {new: true})
      return farmZone
    },
    deleteFarmZone: async (parent, {id}, {models}) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.findByIdAndDelete(id)
      return farmZone
    },
  },
  FarmZone: {
    farm: async (parent, args, {models}) => {
      const {Farm} = models
      const farm = await Farm.findById(parent.farm)
      return farm
    },
    country: async (parent, args, {models}) => {
      const {Country, Farm} = models
      const farm = await Farm.findById(parent.farm)
      const country = await Country.findById(farm.country)
      return country
    },
    region: async (parent, args, {models}) => {
      const {Region, Farm} = models
      const farm = await Farm.findById(parent.farm)
      const region = await Region.findById(farm.region)
      return region
    },
  },
}
