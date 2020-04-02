import {gql, ApolloError} from 'apollo-server-express'
import {LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CountryDocument, RegionDocument} from '@luminate/mongo'

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
      return services.country.getById(id)
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
      return services.region.findRegions({country: parent.id})
    },
  },
}

export interface CountryLoaders {
  // countries: LoaderFn<CountryDocument>
  // regionsOfCountry: LoaderFn<RegionDocument[]>
}

export const loaders: CountryLoaders = {
  // countries: async (ids, models, user) => {
  //   const {Country} = models
  //   const countries = await Country.findByUser(user, {_id: ids})
  //   return ids
  //     .map(id => {
  //       const country = countries.find(country => country._id.toString() === id.toString())
  //       if (!country) return null
  //       return country
  //     })
  //     .filter(Boolean)
  // },
  // regionsOfCountry: async (ids, models, user) => {
  //   const {Region} = models
  //   const regions = await Region.findByUser(user, {country: ids})
  //   return ids.map(id => {
  //     return regions.filter(region => region.country && region.country.toString() === id)
  //   })
  // },
}

export const schema = {typeDefs, resolvers}
