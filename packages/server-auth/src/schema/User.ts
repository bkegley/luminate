import {gql} from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
  }
`
