import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers, Country} from '../types'
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
    listCountries(cursor: String, limit: Int, query: [QueryInput]): CountryConnection!
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
    listCountries: async (parent, args, {models, user}) => {
      const {Country} = models
      const results = await createConnectionResults({user, args, model: Country})
      return results
    },
    getCountry: async (parent, {id}, {models, loaders}, info) => {
      const {countries} = loaders
      return countries.load(id)
    },
  },
  Mutation: {
    createCountry: async (parent, {input}, {models, user}) => {
      const {Country} = models
      const country = await Country.createByUser(user, input)
      return country
    },
    updateCountry: async (parent, {id, input}, {models, user}) => {
      const {Country} = models
      const country = await Country.findByIdAndUpdateByUser(user, id, input, {new: true})
      return country
    },
    deleteCountry: async (parent, {id}, {models, user}) => {
      const {Country} = models
      const country = await Country.findByIdAndDeleteByUser(user, id, {})
      if (!country) {
        throw new ApolloError('Document not found')
      }
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

export interface CountryLoaders {
  countries: LoaderFn<CountryDocument>
  regionsOfCountry: LoaderFn<RegionDocument[]>
}

export const loaders: CountryLoaders = {
  countries: async (ids, models, user) => {
    const {Country} = models
    const countries = await Country.findByUser(user, {_id: ids})
    return ids
      .map(id => {
        const country = countries.find(country => country._id.toString() === id.toString())
        if (!country) return null
        return country
      })
      .filter(Boolean)
  },
  regionsOfCountry: async (ids, models, user) => {
    const {Region} = models
    const regions = await Region.findByUser(user, {country: ids})
    return ids.map(id => {
      return regions.filter(region => region.country && region.country.toString() === id)
    })
  },
}

export const schema = {typeDefs, resolvers}
