import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

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
    listRegions: async (parent, args, {services}) => {
      return services.region.getConnectionResults(args)
    },
    getRegion: async (parent, {id}, {services}) => {
      return services.region.getById(id)
    },
  },
  Mutation: {
    createRegion: async (parent, {input}, {services}) => {
      return services.region.create(input)
    },
    updateRegion: async (parent, {id, input}, {services}) => {
      return services.region.updateById(id, input)
    },
    deleteRegion: async (parent, {id}, {services}) => {
      return services.region.deleteById(id)
    },
  },
  Region: {
    country: async (parent, args, {services}) => {
      if (!parent.country) return null
      return services.country.getById(parent.country)
    },
    farms: async (parent, args, {services}) => {
      return services.farm.findFarms({region: parent.id})
    },
  },
}

export interface RegionLoaders {
  // regions: LoaderFn<RegionDocument>
  // farmsOfRegion: LoaderFn<FarmDocument[]>
}

export const loaders: RegionLoaders = {
  // regions: async (ids, models, user) => {
  //   const {Region} = models
  //   const regions = await Region.findByUser(user, {_id: ids})
  //   return ids
  //     .map(id => {
  //       const region = regions.find((region: any) => region._id.toString() === id.toString())
  //       if (!region) return null
  //       return region
  //     })
  //     .filter(Boolean)
  // },
  // farmsOfRegion: async (ids, models, user) => {
  //   const {Farm} = models
  //   const farms = await Farm.findByUser(user, {region: ids})
  //   return ids.map(id => {
  //     return farms.filter((farm: any) => farm.region.toString() === id.toString())
  //   })
  // },
}

export const schema = {typeDefs, resolvers}
