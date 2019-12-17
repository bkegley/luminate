import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Farm {
    id: ID!
    name: String
    country: Country
    region: Region
    farmZones: [FarmZone]
    createdAt: String
    updatedAt: String
  }

  type FarmConnection {
    pageInfo: PageInfo!
    edges: [FarmEdge!]!
  }

  type FarmEdge {
    cursor: String
    node: Farm
  }

  input CreateFarmInput {
    name: String
    country: ID
    region: ID
  }

  input UpdateFarmInput {
    name: String
    country: ID
    region: ID
  }

  extend type Query {
    listFarms(cursor: String, limit: Int, query: [QueryInput]): FarmConnection!
    getFarm(id: ID!): Farm
  }

  extend type Mutation {
    createFarm(input: CreateFarmInput!): Farm
    updateFarm(id: ID!, input: UpdateFarmInput!): Farm
    deleteFarm(id: ID!): Farm
  }
`

export const resolvers: Resolvers = {
  Query: {
    listFarms: async (parent, args, {models}) => {
      const {Farm} = models

      const results = await createConnectionResults({args, model: Farm})
      return results
    },
    getFarm: async (parent, {id}, {models}, info) => {
      const {Farm} = models
      const farm = await Farm.findById(id)
      return farm
    },
  },
  Mutation: {
    createFarm: async (parent, {input}, {models}) => {
      const {Farm} = models
      const farm = await new Farm(input).save()
      return farm
    },
    updateFarm: async (parent, {id, input}, {models}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndUpdate(id, input, {new: true})
      return farm
    },
    deleteFarm: async (parent, {id}, {models}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndDelete(id)
      return farm
    },
  },
  Farm: {
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
    farmZones: async (parent, args, {models}) => {
      const {FarmZone} = models
      const farmZones = await FarmZone.find({farm: parent.id})
      return farmZones
    },
  },
}
