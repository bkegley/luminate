import mongoose from 'mongoose'
import {gql, ApolloError, ForbiddenError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn, hasScopes} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {DeviceDocument, VarietyDocument} from '@luminate/mongo'

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
    listDevices(cursor: String, limit: Int, query: [QueryInput]): DeviceConnection!
    getDevice(id: ID!): Device
  }

  extend type Mutation {
    createDevice(input: CreateDeviceInput!): Device
    updateDevice(id: ID!, input: UpdateDeviceInput!): Device
    deleteDevice(id: ID!): Device
    updateDevicePermissionsForAccount(DeviceId: ID!, accountId: ID!, permissionTypes: [PermissionTypeEnum!]!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listDevices: async (parent, args, {models, user}) => {
      // const isAuthorized = hasScopes(user, ['read:device'])
      // if (!isAuthorized) throw new Error('Not authorized!')
      const {Device} = models
      const results = await createConnectionResults({user, args, model: Device})
      return results
    },
    getDevice: async (parent, {id}, {loaders}, info) => {
      const {devices} = loaders
      return devices.load(id)
    },
  },
  Mutation: {
    createDevice: async (parent, {input}, {models, user}) => {
      const {Device} = models
      const device = await Device.createByUser(user, input)
      return device
    },
    updateDevice: async (parent, {id, input}, {models, user}) => {
      const {Device} = models
      const device = await Device.findByIdAndUpdateByUser(user, id, input, {new: true})
      if (!device) {
        throw new ForbiddenError('Not authorized!')
      }
      return device
    },
    deleteDevice: async (parent, {id}, {models, user}) => {
      const {Device} = models
      const device = await Device.findByIdAndDeleteByUser(user, id, {})
      if (!device) {
        throw new ApolloError('Document not found')
      }
      return device
    },
  },
}

export interface DeviceLoaders {
  devices: LoaderFn<DeviceDocument>
}

export const loaders: DeviceLoaders = {
  devices: async (ids, models, user) => {
    const {Device} = models
    const devices = await Device.findByUser(user, {_id: ids})
    return ids.map(id => {
      const device = devices.find(device => device._id.toString() === id.toString())
      if (!device) return null
      return device
    })
  },
}

export const schema = {typeDefs, resolvers}
