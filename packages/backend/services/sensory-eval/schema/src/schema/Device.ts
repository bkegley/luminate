import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Device {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type DeviceConnection {
    pageInfo: PageInfo!
    edges: [DeviceEdge!]!
  }

  type DeviceEdge {
    cursor: String!
    node: Device!
  }

  input CreateDeviceInput {
    name: String!
  }

  input UpdateDeviceInput {
    name: String
  }

  extend type Query {
    listDevices(cursor: String, limit: Int, query: [QueryInput!]): DeviceConnection!
    getDevice(id: ID!): Device
  }

  extend type Mutation {
    createDevice(input: CreateDeviceInput!): Device
    updateDevice(id: ID!, input: UpdateDeviceInput!): Device
    deleteDevice(id: ID!): Device
  }
`

const resolvers: Resolvers = {
  Query: {
    listDevices: async (parent, args, {services}) => {
      return services.device.getConnectionResults(args)
    },
    getDevice: async (parent, {id}, {services}, info) => {
      return services.device.getById(id)
    },
  },
  Mutation: {
    createDevice: async (parent, {input}, {services}) => {
      return services.device.create(input)
    },
    updateDevice: async (parent, {id, input}, {services}) => {
      return services.device.updateById(id, input)
    },
    deleteDevice: async (parent, {id}, {services}) => {
      return services.device.deleteById(id)
    },
  },
}

export const schema = {typeDefs, resolvers}
