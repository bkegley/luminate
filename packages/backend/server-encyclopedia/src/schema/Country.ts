import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Country {
    id: ID!
    name: String!
    regions: [Region]
    createdAt: String!
    updatedAt: String!
  }

  type CountryConnection {
    pageInfo: PageInfo!
    edges: [CountryEdge!]!
  }

  type CountryEdge {
    cursor: String!
    node: Country!
  }

  input CreateCountryInput {
    name: String!
  }

  input UpdateCountryInput {
    name: String
  }

  extend type Query {
    listCountries(cursor: String, limit: Int, query: [QueryInput!]): CountryConnection!
    getCountry(id: ID!): Country
  }

  extend type Mutation {
    createCountry(input: CreateCountryInput!): Country
    updateCountry(id: ID!, input: UpdateCountryInput!): Country
    deleteCountry(id: ID!): Country
  }
`

const resolvers: Resolvers = {
  Query: {
    listCountries: async (parent, args, {services}) => {
      return services.country.getConnectionResults(args)
    },
    getCountry: async (parent, {id}, {services}, info) => {
      return services.country.getByName(id)
    },
  },
  Mutation: {
    createCountry: async (parent, {input}, {services}) => {
      return services.country.create(input)
    },
    updateCountry: async (parent, {id, input}, {services}) => {
      return services.country.updateById(id, input)
    },
    deleteCountry: async (parent, {id}, {services}) => {
      return services.country.deleteById(id)
    },
  },
  Country: {
    regions: async (parent, args, {services}) => {
      return services.region.listByCountryName(parent.name)
    },
  },
}

export const schema = {typeDefs, resolvers}
