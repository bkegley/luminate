import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Region {
    id: ID!
    name: String!
    country: Country
    farms: [Farm]
  }

  type RegionConnection {
    pageInfo: PageInfo!
    edges: [RegionEdge!]!
  }

  type RegionEdge {
    cursor: String!
    node: Region!
  }

  extend type Query {
    listRegions(cursor: String, limit: Int, query: [QueryInput!]): RegionConnection!
    getRegion(id: ID!): Region
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
  Region: {
    country: async (parent, args, {services}) => {
      if (!parent.country) return null
      return services.country.getById(parent.country)
    },
    farms: async (parent, args, {services}) => {
      return services.farm.listByRegionName(parent.id)
    },
  },
}

export const schema = {typeDefs, resolvers}
