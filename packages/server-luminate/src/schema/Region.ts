import {gql} from 'apollo-server-express'

export const typeDefs = gql`
  type Region {
    id: ID!
    name: String
    country: Country
  }
`
