import {gql} from 'apollo-server-express'
import {LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CoffeeDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Coffee @key(fields: "id") {
    id: ID!
    name: String!
    country: Country
    region: Region
    varieties: [Variety!]!
    elevation: String
    components: [CoffeeComponent]
    notes(fields: [String]): [Note]
    createdAt: String!
    updatedAt: String!
  }

  type CoffeeComponent {
    coffee: CoffeeSummary!
    percentage: Float!
  }

  type CoffeeSummary {
    id: ID!
    name: String!
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
    components: [ComponentInput]
  }

  input UpdateCoffeeInput {
    name: String
    country: ID
    region: ID
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
    components: [ComponentInput]
  }

  input ComponentInput {
    coffee: ID!
    percentage: Float!
  }

  extend type Query {
    listCoffees(cursor: String, limit: Int, query: [QueryInput!]): CoffeeConnection!
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
    listCoffees: async (parent, args, {services}) => {
      return services.coffee.getConnectionResults(args)
    },
    getCoffee: async (parent, {id}, {services}) => {
      return services.coffee.getById(id)
    },
  },
  Mutation: {
    createCoffee: async (parent, {input}, {services}) => {
      return services.coffee.create(input)
    },
    updateCoffee: async (parent, {id, input}, {services}) => {
      return services.coffee.updateById(id, input)
    },
    deleteCoffee: async (parent, {id}, {services}) => {
      return services.coffee.deleteById(id)
    },
    updateCoffeePermissionsForAccount: async (parent, {coffeeId, accountId, permissionTypes}, {models, user}) => {
      // TODO: fix this
      return false
      // const {Coffee} = models
      // const coffee = await Coffee.updateEntityPermissionsForAccountByUser(user, coffeeId, accountId, permissionTypes)
      // return !!coffee
    },
  },
  Coffee: {
    __resolveReference: async (object, {services}) => {
      return services.coffee.getById(object.id)
      // const {coffees} = loaders
      // return coffees.load(object.id)
    },
    country: async (parent, args, {services}) => {
      if (!parent.country) return null
      return services.country.getById(parent.country)
      // return countries.load(parent.country)
    },
    notes: async (parent, {fields}, {services}) => {
      const notes = await services.note.findNotes({entityId: parent.id})
      return fields ? notes.filter(note => fields.includes(note.field)) : notes
      // const {notesOfEntity} = loaders
      // const notes = await notesOfEntity.load(parent._id)
      // return fields ? notes.filter(note => fields.includes(note.field)) : notes
    },
    region: async (parent, args, {services}) => {
      if (!parent.region) return null
      return services.region.getById(parent.region)
      // const {regions} = loaders
      // return regions.load(parent.region)
    },
    varieties: async (parent, args, {services}) => {
      if (!parent.varieties) return []
      return services.variety.findVarieties({_id: parent.varieties})
      // const {varieties} = loaders
      // return (await Promise.all(parent.varieties.map(id => varieties.load(id)))).filter(Boolean)
    },
  },
  CoffeeComponent: {
    coffee: async (parent, args, {services}) => {
      const summaryCoffee = await services.coffee.getById(parent.coffee.id)
      return {
        ...parent.coffee,
        coffee: summaryCoffee,
      }
      // const {coffees} = loaders
      // const coffee = coffees.load((parent.coffee as unknown) as string)
      // return coffee
    },
  },
}

export interface CoffeeLoaders {
  // coffees: LoaderFn<CoffeeDocument>
}

export const loaders: CoffeeLoaders = {
  // coffees: async (ids, models, user) => {
  //   const {Coffee} = models
  //   const coffees = await Coffee.findByUser(user, {_id: ids})
  //   return ids.map(id => {
  //     const coffee = coffees.find(coffee => coffee._id.toString() === id.toString())
  //     if (!coffee) return null
  //     return coffee
  //   })
  // },
}

export const schema = {typeDefs, resolvers}
