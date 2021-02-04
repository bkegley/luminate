import {gql} from 'apollo-server-express'
import {Resolvers} from '../../types'

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
