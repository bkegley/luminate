import {gql} from 'apollo-server-express'

export const sharedTypeDefs = gql`
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
