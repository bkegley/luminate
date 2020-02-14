import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {FarmZoneDocument} from '@luminate/mongo'

const typeDefs = gql`
  type FarmZone {
    id: ID!
    name: String!
    country: Country
    region: Region
    farm: Farm
    createdAt: String!
    updatedAt: String!
  }

  type FarmZoneConnection {
    pageInfo: PageInfo!
    edges: [FarmZoneEdge!]!
  }

  type FarmZoneEdge {
    cursor: String!
    node: FarmZone!
  }

  input CreateFarmZoneInput {
    name: String!
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

const resolvers: Resolvers = {
  Query: {
    listFarmZones: async (parent, args, {models, user}) => {
      const {FarmZone} = models

      const results = await createConnectionResults({user, args, model: FarmZone})
      return results
    },
    getFarmZone: async (parent, {id}, {loaders}, info) => {
      const {farmZones} = loaders
      return farmZones.load(id)
    },
  },
  Mutation: {
    createFarmZone: async (parent, {input}, {models, user}) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.createByUser(user, input)
      return farmZone
    },
    updateFarmZone: async (parent, {id, input}, {models, user}) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.findByIdAndUpdateByUser(user, id, input, {new: true})
      return farmZone
    },
    deleteFarmZone: async (parent, {id}, {models, user}) => {
      const {FarmZone} = models
      const farmZone = await FarmZone.findByIdAndDeleteByUser(user, id, {})
      if (!farmZone) {
        throw new ApolloError('Document not found')
      }
      return farmZone
    },
  },
  FarmZone: {
    farm: async (parent, args, {loaders}) => {
      const {farms} = loaders
      if (!parent.farm) return null
      return farms.load(parent.farm)
    },
    country: async (parent, args, {loaders, models, user}) => {
      const {Farm} = models
      const {countries} = loaders

      if (!parent.farm) return null
      const farm = await Farm.findByIdByUser(user, parent.farm)

      if (!farm || !farm.country) return null
      return countries.load(farm.country)
    },
    region: async (parent, args, {loaders, models, user}) => {
      const {Farm} = models
      const {regions} = loaders

      if (!parent.farm) return null
      const farm = await Farm.findByIdByUser(user, parent.farm)

      if (!farm || !farm.region) return null
      return regions.load(farm.region)
    },
  },
}

export interface FarmZoneLoaders {
  farmZones: LoaderFn<FarmZoneDocument>
}

export const loaders: FarmZoneLoaders = {
  farmZones: async (ids, models, user) => {
    const {FarmZone} = models
    const farmZones = await FarmZone.findByUser(user, {_id: ids})
    return ids.map(id => {
      const farmZone = farmZones.find(farmZone => farmZone._id.toString() === id.toString())
      if (!farmZone) return null
      return farmZone
    })
  },
}

export const schema = {typeDefs, resolvers}
