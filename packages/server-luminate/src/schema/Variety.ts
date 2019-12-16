import {gql} from 'apollo-server-express'

export const typeDefs = gql`
  type Variety {
    id: ID!
    name: String
    background: String
    countriesFoundIn: [Country]
  }
`
