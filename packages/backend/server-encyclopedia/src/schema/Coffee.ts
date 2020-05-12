import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'
import {VarietyDocument} from '@luminate/mongo'

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
    country: String
    region: String
    farm: ID
    farmZone: ID
    varieties: [ID]
    elevation: String
    components: [ComponentInput]
  }

  input UpdateCoffeeInput {
    name: String
    country: String
    region: String
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
    admin
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
    updateCoffeePermissionsForAccount: async (parent, {coffeeId, accountId, permissionTypes}, {services}) => {
      const coffee = await services.coffee.updateEntityPermissionsForAccount({
        entityId: coffeeId,
        accountId,
        permissions: permissionTypes,
      })
      return !!coffee
    },
  },
  Coffee: {
    __resolveReference: async (object, {services}) => {
      return services.coffee.getById(object.id)
    },
    country: async (parent, args, {services}) => {
      if (!parent.country) return null
      return services.country.getByName(parent.country)
    },
    notes: async (parent, {fields}, {services}) => {
      const notes = await services.note.listByEntityId(parent.id)
      return fields ? (notes ? notes.filter(note => fields.includes(note.field)) : []) : notes ? notes : []
    },
    region: async (parent, args, {services}) => {
      if (!parent.region) return null
      return services.region.getByName(parent.region)
    },
    varieties: async (parent, args, {services}) => {
      if (!parent.varieties) return []
      return (await Promise.all(parent.varieties.map(id => services.variety.getById(id)))).filter(
        Boolean,
      ) as VarietyDocument[]
    },
  },
  CoffeeComponent: {
    coffee: async (parent, args, {services}) => {
      const summaryCoffee = await services.coffee.getById(parent.coffee.id)
      return {
        ...parent.coffee,
        coffee: summaryCoffee,
      }
    },
  },
}

export const schema = {typeDefs, resolvers}
