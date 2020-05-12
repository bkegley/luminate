import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

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
    listFarms(cursor: String, limit: Int, query: [QueryInput!]): FarmConnection!
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
    listFarms: async (parent, args, {services}) => {
      return services.farm.getConnectionResults(args)
    },
    getFarm: async (parent, {id}, {services}, info) => {
      return services.farm.getById(id)
    },
  },
  Mutation: {
    createFarm: async (parent, {input}, {services}) => {
      return services.farm.create(input)
    },
    updateFarm: async (parent, {id, input}, {services}) => {
      return services.farm.updateById(id, input)
    },
    deleteFarm: async (parent, {id}, {services}) => {
      return services.farm.deleteById(id)
    },
    createFarmZone: async (parent, {farmId, input}, {services}) => {
      return services.farm.createFarmZone(farmId, input)
    },
    updateFarmZone: async (parent, {id, input}, {services}) => {
      return services.farm.updateFarmZoneById(id, input)
    },
    deleteFarmZone: async (parent, {id}, {services}) => {
      return services.farm.deleteFarmZoneById(id)
    },
  },
  Farm: {
    country: async (parent, args, {services}) => {
      if (!parent.country) return null
      return services.country.getByName(parent.country)
    },
    region: async (parent, args, {services}) => {
      if (!parent.region) return null
      return services.region.getByName(parent.region)
    },
  },
}

export const schema = {typeDefs, resolvers}
