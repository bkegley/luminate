import {gql} from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    _query: String
  }

  type Mutation {
    _mutation: String
  }

  type Subscription {
    _subscription: String
  }
`
