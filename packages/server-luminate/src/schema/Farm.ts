import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers, Farm, FarmZone} from '../types'

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
    getFarm: async (parent, {id}, {loaders}, info) => {
      const {farms} = loaders
      return farms.load(id)
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
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {regions} = loaders
      return regions.load(parent.region)
    },
    farmZones: async (parent, args, {models, loaders}) => {
      const {farmZonesOfFarm} = loaders
      return farmZonesOfFarm.load(parent.id)
    },
  },
}

export interface FarmLoaders {
  farms: LoaderFn<Farm>
  farmZonesOfFarm: LoaderFn<FarmZone[]>
}

export const loaders: FarmLoaders = {
  farms: async (ids, models) => {
    const {Farm} = models
    const farms = await Farm.find({_id: ids})
    return ids.map(id => farms.find((farm: any) => farm._id.toString() === id.toString()))
  },
  farmZonesOfFarm: async (ids, models) => {
    const {FarmZone} = models
    const farmZones = await FarmZone.find({farm: ids})
    return ids.map(id => {
      return farmZones.filter((farmZone: any) => farmZone.farm && farmZone.farm.toString() === id)
    })
  },
}
