import {gql} from 'apollo-server-express'
import {createConnectionResults} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Country {
    id: ID!
    name: String
    regions: [Region]
    createdAt: String
    updatedAt: String
  }

  type CountryConnection {
    pageInfo: PageInfo!
    edges: [CountryEdge!]!
  }

  type CountryEdge {
    cursor: String
    node: Country
  }

  input CreateCountryInput {
    name: String
  }

  input UpdateCountryInput {
    name: String
  }

  extend type Query {
    listCountries(cursor: String, limit: Int, query: [QueryInput]): CountryConnection!
    getCountry(id: ID!): Country
  }

  extend type Mutation {
    createCountry(input: CreateCountryInput!): Country
    updateCountry(id: ID!, input: UpdateCountryInput!): Country
    deleteCountry(id: ID!): Country
  }
`

export const resolvers: Resolvers = {
  Query: {
    listCountries: async (parent, args, {models}) => {
      const {Country} = models

      const results = await createConnectionResults({args, model: Country})
      return results
    },
    getCountry: async (parent, {id}, {models, loaders}, info) => {
      const {countries} = loaders
      return countries.load(id)
    },
  },
  Mutation: {
    createCountry: async (parent, {input}, {models}) => {
      const {Country} = models
      const country = await new Country(input).save()
      return country
    },
    updateCountry: async (parent, {id, input}, {models}) => {
      const {Country} = models
      const country = await Country.findByIdAndUpdate(id, input, {new: true})
      return country
    },
    deleteCountry: async (parent, {id}, {models}) => {
      const {Country} = models
      const country = await Country.findByIdAndDelete(id)
      return country
    },
  },
  Country: {
    regions: async (parent, args, {loaders}) => {
      const {regionsOfCountry} = loaders
      return regionsOfCountry.load(parent.id)
    },
  },
}

export const loaders = {
  countries: async (ids: string[], models: any) => {
    const {Country} = models
    const countries = await Country.find({_id: ids})
    return ids.map(id => countries.find((country: any) => country._id.toString() === id.toString()))
  },
  regionsOfCountry: async (ids: string[], models: any) => {
    const {Region} = models
    const regions = await Region.find({country: ids})
    return ids.map(id => {
      return regions.filter((region: any) => region.country && region.country.toString() === id)
    })
  },
}
