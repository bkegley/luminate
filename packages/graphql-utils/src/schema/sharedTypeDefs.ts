import {gql} from 'apollo-server-express'

export const sharedTypeDefs = gql`
  type Query {
    _query: String
  }

  type Mutation {
    _mutation: String
  }

  type Subscription {
    _subscription: String
  }

  type PageInfo {
    hasNextPage: Boolean
    prevCursor: String
    nextCursor: String
  }

  enum OperatorEnum {
    eq
    ne
    gt
    gte
    lt
    lte
    contains
    containsSensitive
  }

  input QueryInput {
    field: String!
    value: String
    operator: OperatorEnum
  }
`
