import {gql} from 'apollo-server-express'

const typeDefs = gql`
  type BrewingSession {
    id: ID!
    date: String
    description: String
  }

  type BrewingSessionConnection {
    pageInfo: PageInfo
    edges: [BrewingSessionEdge]
  }

  type BrewingSessionEdge {
    cursor: String
    node: BrewingSession
  }

  input CreateBrewingSessionInput {
    date: String
    description: String
  }

  input UpdateBrewingSessionInput {
    date: String
    description: String
  }

  extend type Query {
    listBrewingSessions: BrewingSessionConnection
    getBrewingSession(id: ID!): BrewingSession
  }

  extend type Mutation {
    createBrewingSession(input: CreateBrewingSessionInput): BrewingSession
    updateBrewingSession(id: ID!, input: UpdateBrewingSessionInput): BrewingSession
    deleteBrewingSession(id: ID!): Boolean
  }
`

export const schema = {typeDefs}
