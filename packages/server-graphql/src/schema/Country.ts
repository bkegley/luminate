import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Country {
    id: ID!
    name: String
    regions: [Region]
  }

  input CreateCountryInput {
    name: String
  }

  extend type Query {
    listCountries: [Country]
    getCountry(id: ID!): Country
  }

  extend type Mutation {
    createCountry(input: CreateCountryInput!): Country
  }
`

export const resolvers: Resolvers = {
  Query: {
    listCountries: async (parent, args, {models}) => {
      const {Country} = models
      const countries = Country.find()
      return countries
    },
    getCountry: async (parent, {id}, {models}, info) => {
      const {Country} = models
      const country = await Country.findById(id)
      return country
    },
  },
  Mutation: {
    createCountry: async (parent, {input}, {models}) => {
      const {Country} = models
      const country = await new Country(input).save()
      return country
    },
  },
}
