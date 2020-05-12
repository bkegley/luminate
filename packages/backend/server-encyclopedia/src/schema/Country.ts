import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

const typeDefs = gql`
  type Country {
    id: ID!
    name: String!
    regions: [Region]
  }

  type CountryConnection {
    pageInfo: PageInfo!
    edges: [CountryEdge!]!
  }

  type CountryEdge {
    cursor: String!
    node: Country!
  }

  extend type Query {
    listCountries(cursor: String, limit: Int, query: [QueryInput!]): CountryConnection!
    getCountry(id: ID!): Country
  }
`

const resolvers: Resolvers = {
  Query: {
    listCountries: async (parent, args, {services}) => {
      return services.country.getConnectionResults(args)
    },
    getCountry: async (parent, {id}, {services}, info) => {
      return services.country.getById(id)
    },
  },
  Country: {
    regions: async (parent, args, {services}) => {
      return services.region.listByCountryName(parent.name)
    },
  },
}

export const schema = {typeDefs, resolvers}
