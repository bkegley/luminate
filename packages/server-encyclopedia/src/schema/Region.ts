// @ts-nocheck

import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {RegionDocument, FarmDocument} from '@luminate/mongo'
import {RegionService} from '@luminate/mongo'

const typeDefs = gql`
  type Region {
    id: ID!
    name: String!
    country: Country
    farms: [Farm]
    createdAt: String!
    updatedAt: String!
  }

  type RegionConnection {
    pageInfo: PageInfo!
    edges: [RegionEdge!]!
  }

  type RegionEdge {
    cursor: String!
    node: Region!
  }

  input CreateRegionInput {
    name: String!
    country: ID
  }

  input UpdateRegionInput {
    name: String
    country: ID
  }

  extend type Query {
    listRegions(cursor: String, limit: Int, query: [QueryInput!]): RegionConnection!
    getRegion(id: ID!): Region
  }

  extend type Mutation {
    createRegion(input: CreateRegionInput!): Region
    updateRegion(id: ID!, input: UpdateRegionInput!): Region
    deleteRegion(id: ID!): Region
  }
`

const resolvers: Resolvers = {
  Query: {
    listRegions: async (parent, args, {models, user}) => {
      // const {Region} = models
      // const results = Region.listRegions(args)
      if ((RegionService as any).loadUser) {
        RegionService.loadUser(user)
      }

      const repo = new RegionService()

      return repo.listRegions(args)
    },
    getRegion: async (parent, {id}, {loaders}, info) => {
      const {regions} = loaders
      return regions.load(id)
    },
  },
  Mutation: {
    createRegion: async (parent, {input}, {models, user}) => {
      const {Region} = models
      const region = await Region.createByUser(user, input)
      return region
    },
    updateRegion: async (parent, {id, input}, {models, user}) => {
      const {Region} = models
      const region = await Region.findByIdAndUpdateByUser(user, id, input, {new: true})
      return region
    },
    deleteRegion: async (parent, {id}, {models, user}) => {
      const {Region} = models
      const region = await Region.findByIdAndDeleteByUser(user, id, {})
      if (!region) {
        throw new ApolloError('Document not found')
      }
      return region
    },
  },
  Region: {
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      if (!parent.country) return null
      return countries.load(parent.country)
    },
    farms: async (parent, args, {loaders}) => {
      const {farmsOfRegion} = loaders
      return farmsOfRegion.load(parent.id)
    },
  },
}

export interface RegionLoaders {
  regions: LoaderFn<RegionDocument>
  farmsOfRegion: LoaderFn<FarmDocument[]>
}

export const loaders: RegionLoaders = {
  regions: async (ids, models, user) => {
    const {Region} = models
    const regions = await Region.findByUser(user, {_id: ids})
    return ids
      .map(id => {
        const region = regions.find((region: any) => region._id.toString() === id.toString())
        if (!region) return null
        return region
      })
      .filter(Boolean)
  },
  farmsOfRegion: async (ids, models, user) => {
    const {Farm} = models
    const farms = await Farm.findByUser(user, {region: ids})
    return ids.map(id => {
      return farms.filter((farm: any) => farm.region.toString() === id.toString())
    })
  },
}

export const schema = {typeDefs, resolvers}
