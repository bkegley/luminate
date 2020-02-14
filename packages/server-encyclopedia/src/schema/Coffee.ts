import mongoose from 'mongoose'
import {gql, ApolloError, ForbiddenError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn, hasScopes} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CoffeeDocument, VarietyDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Coffee @key(fields: "id") {
    id: ID!
    name: String!
    country: Country
    region: Region
    varieties: [Variety!]!
    elevation: String
    createdAt: String!
    updatedAt: String!
  }

  type CoffeeConnection {
    pageInfo: PageInfo!
    edges: [CoffeeEdge!]!
  }

  type CoffeeEdge {
    cursor: String!
    node: Coffee!
  }

  input CreateCoffeeInput {
    name: String!
    country: ID
    region: ID
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
  }

  input UpdateCoffeeInput {
    name: String
    country: ID
    region: ID
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
  }

  extend type Query {
    listCoffees(cursor: String, limit: Int, query: [QueryInput]): CoffeeConnection!
    getCoffee(id: ID!): Coffee
  }

  enum PermissionTypeEnum {
    read
    write
  }

  extend type Mutation {
    createCoffee(input: CreateCoffeeInput!): Coffee
    updateCoffee(id: ID!, input: UpdateCoffeeInput!): Coffee
    deleteCoffee(id: ID!): Coffee
    updateCoffeePermissionsForAccount(coffeeId: ID!, accountId: ID!, permissionTypes: [PermissionTypeEnum!]!): Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    listCoffees: async (parent, args, {models, user}) => {
      const isAuthorized = hasScopes(user, ['read:coffee'])
      if (!isAuthorized) throw new Error('Not authorized!')
      const {Coffee} = models
      const results = await createConnectionResults({user, args, model: Coffee})
      return results
    },
    getCoffee: async (parent, {id}, {loaders}, info) => {
      const {coffees} = loaders
      return coffees.load(id)
    },
  },
  Mutation: {
    createCoffee: async (parent, {input}, {models, user}) => {
      const {Coffee} = models
      const coffee = await Coffee.createByUser(user, input)
      return coffee
    },
    updateCoffee: async (parent, {id, input}, {models, user}) => {
      const {Coffee} = models
      const coffee = await Coffee.findByIdAndUpdateByUser(user, id, input, {new: true})
      if (!coffee) {
        throw new ForbiddenError('Not authorized!')
      }
      return coffee
    },
    deleteCoffee: async (parent, {id}, {models, user}) => {
      const {Coffee} = models
      const coffee = await Coffee.findByIdAndDeleteByUser(user, id, {})
      if (!coffee) {
        throw new ApolloError('Document not found')
      }
      return coffee
    },
    updateCoffeePermissionsForAccount: async (parent, {coffeeId, accountId, permissionTypes}, {models, user}) => {
      const {Coffee} = models
      const coffee = await Coffee.updateEntityPermissionsForAccountByUser(user, coffeeId, accountId, permissionTypes)
      return !!coffee
    },
  },
  Coffee: {
    __resolveReference: (object, {loaders}) => {
      const {coffees} = loaders
      return coffees.load(object.id)
    },
    country: async (parent, args, {loaders, user}) => {
      const {countries} = loaders
      if (!parent.country) return null
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {regions} = loaders
      if (!parent.region) return null
      return regions.load(parent.region)
    },
    varieties: async (parent, args, {models, loaders}) => {
      const {varieties} = loaders
      if (!parent.varieties) return []
      return (await Promise.all(parent.varieties.map(id => varieties.load(id)))).filter(Boolean)
    },
  },
}

export interface CoffeeLoaders {
  coffees: LoaderFn<CoffeeDocument>
}

export const loaders: CoffeeLoaders = {
  coffees: async (ids, models, user) => {
    const {Coffee} = models
    const coffees = await Coffee.findByUser(user, {_id: ids})
    return ids.map(id => {
      const coffee = coffees.find(coffee => coffee._id.toString() === id.toString())
      if (!coffee) return null
      return coffee
    })
  },
}

export const schema = {typeDefs, resolvers}
