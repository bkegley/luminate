import {gql} from 'apollo-server-express'

import {typeDefs as userTypeDefs} from './User'

const defaultTypeDefs = gql`
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

export const typeDefs = [
  defaultTypeDefs,
  userTypeDefs
]