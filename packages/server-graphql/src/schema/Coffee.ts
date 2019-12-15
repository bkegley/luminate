import {gql} from 'apollo-server-express'
import {Resolvers} from '../types'

export const typeDefs = gql`
  type Coffee {
    id: ID!
    name: String
    country: Country
    region: Region
    varieties: [Variety]
    elevation: String
  }

  input CreateCoffeeCoffeeInput {
    name: String
    region: ID
  }

  extend type Query {
    listCoffees: [Coffee]
    getCoffee(id: ID!): Coffee
  }

  extend type Mutation {
    createCoffee(input: CreateCoffeeCoffeeInput!): Coffee
  }
`

export const resolvers: Resolvers = {
  Query: {
    listCoffees: async (parent, args, {models}) => {
      const {Coffee} = models
      const coffees = Coffee.find()
      return coffees
    },
    getCoffee: async (parent, {id}, {models}, info) => {
      const {Coffee} = models
      const coffee = await Coffee.findById(id)
      return coffee
    },
  },
  Mutation: {
    createCoffee: async (parent, {input}, {models}) => {
      const {Coffee} = models
      const coffee = await new Coffee(input).save()
      return coffee
    },
  },
  Coffee: {
    country: async (parent, args, {models}) => {
      const {Country} = models
      console.log({parent})
      const country = await Country.findById(parent.country)
      return country
    },
  },
}
