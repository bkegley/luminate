import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {FarmDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Farm {
    id: ID!
    name: String!
    country: Country
    region: Region
    farmZones: [FarmZone!]!
    createdAt: String!
    updatedAt: String!
  }

  type FarmZone {
    id: ID!
    name: String!
  }

  type FarmConnection {
    pageInfo: PageInfo!
    edges: [FarmEdge!]!
  }

  type FarmEdge {
    cursor: String!
    node: Farm!
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

  input CreateFarmZoneInput {
    name: String!
  }

  input UpdateFarmZoneInput {
    name: String!
  }

  extend type Query {
    listFarms(cursor: String, limit: Int, query: [QueryInput]): FarmConnection!
    getFarm(id: ID!): Farm
  }

  extend type Mutation {
    createFarm(input: CreateFarmInput!): Farm
    updateFarm(id: ID!, input: UpdateFarmInput!): Farm
    deleteFarm(id: ID!): Farm
    createFarmZone(farmId: ID!, input: CreateFarmZoneInput): Farm
    updateFarmZone(id: ID!, input: UpdateFarmZoneInput): Farm
    deleteFarmZone(id: ID!): Farm
  }
`

const resolvers: Resolvers = {
  Query: {
    listFarms: async (parent, args, {models, user}) => {
      const {Farm} = models
      const results = await createConnectionResults({user, args, model: Farm})
      return results
    },
    getFarm: async (parent, {id}, {loaders}, info) => {
      const {farms} = loaders
      return farms.load(id)
    },
  },
  Mutation: {
    createFarm: async (parent, {input}, {models, user}) => {
      const {Farm} = models
      const farm = await Farm.createByUser(user, input)
      return farm
    },
    updateFarm: async (parent, {id, input}, {models, user}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndUpdateByUser(user, id, input, {new: true})
      return farm
    },
    deleteFarm: async (parent, {id}, {models, user}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndDeleteByUser(user, id, {})
      if (!farm) {
        throw new ApolloError('Document not found')
      }
      return farm
    },
    createFarmZone: async (parent, {farmId, input}, {user, models}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndUpdateByUser(user, farmId, {$push: {farmZones: input}}, {new: true})
      return farm
    },
    updateFarmZone: async (parent, {id, input}, {user, models}) => {
      const {Farm} = models
      const farm = await Farm.findOneAndUpdateByUser(
        user,
        {'farmZones._id': id},
        {$set: {'farmZones.$': {_id: id, ...input}}},
        {new: true},
      )
      return farm
    },
    deleteFarmZone: async (parent, {id}, {user, models}) => {
      const {Farm} = models
      const farm = await Farm.findOneAndUpdateByUser(
        user,
        {'farmZones._id': id},
        {$pull: {farmZones: {_id: id}}},
        {new: true},
      )
      return farm
    },
  },
  Farm: {
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      if (!parent.country) return null
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {regions} = loaders
      if (!parent.region) return null
      return regions.load(parent.region)
    },
  },
}

export interface FarmLoaders {
  farms: LoaderFn<FarmDocument>
}

export const loaders: FarmLoaders = {
  farms: async (ids, models, user) => {
    const {Farm} = models
    const farms = await Farm.findByUser(user, {_id: ids})
    return ids
      .map(id => {
        const farm = farms.find((farm: any) => farm._id.toString() === id.toString())
        if (!farm) return null
        return farm
      })
      .filter(Boolean)
  },
}

export const schema = {typeDefs, resolvers}
