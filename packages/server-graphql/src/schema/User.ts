import {gql} from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
  }
`
