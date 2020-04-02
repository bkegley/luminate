import {gql, ApolloError} from 'apollo-server-express'
import {LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {CuppingSessionDocument} from '@luminate/mongo'

const typeDefs = gql`
  type CuppingSession @key(fields: "id") {
    id: ID!
    internalId: ID
    description: String
    sessionCoffees: [SessionCoffee]
    createdAt: String!
    updatedAt: String!
  }

  type SessionCoffee {
    id: ID!
    sampleNumber: ID!
    coffee: Coffee!
    scoreSheets: [ScoreSheet]
  }

  extend type Coffee @key(fields: "id") {
    id: ID! @external
  }

  type CuppingSessionConnection {
    pageInfo: PageInfo!
    edges: [CuppingSessionEdge!]!
  }

  type CuppingSessionEdge {
    cursor: String!
    node: CuppingSession!
  }

  input CreateCuppingSessionInput {
    internalId: ID
    description: String
  }

  input UpdateCuppingSessionInput {
    internalId: ID
    description: String
    sessionCoffees: [SessionCoffeeInput]
  }

  input SessionCoffeeInput {
    sampleNumber: ID!
    coffee: ID
  }

  extend type Query {
    listCuppingSessions(cursor: String, limit: Int, query: [QueryInput!]): CuppingSessionConnection!
    getCuppingSession(id: ID!): CuppingSession
  }

  extend type Mutation {
    createCuppingSession(input: CreateCuppingSessionInput!): CuppingSession
    updateCuppingSession(id: ID!, input: UpdateCuppingSessionInput!): CuppingSession
    deleteCuppingSession(id: ID!): CuppingSession
  }
`

const resolvers: Resolvers = {
  Query: {
    listCuppingSessions: async (parent, args, {services}) => {
      return services.cuppingSession.getConnectionResults(args)
    },
    getCuppingSession: async (parent, {id}, {services}, info) => {
      return services.cuppingSession.getById(id)
      // const {cuppingSessions} = loaders
      // return cuppingSessions.load(id)
    },
  },
  Mutation: {
    createCuppingSession: async (parent, {input}, {services}) => {
      return services.cuppingSession.create(input)
    },
    updateCuppingSession: async (parent, {id, input}, {services}) => {
      return services.cuppingSession.updateById(id, input)
    },
    deleteCuppingSession: async (parent, {id}, {services}) => {
      return services.cuppingSession.deleteById(id)
    },
  },
  SessionCoffee: {
    coffee: parent => {
      return {__typename: 'Coffee', id: parent.coffee}
    },
  },
}

export interface CuppingSessionLoaders {
  // cuppingSessions: LoaderFn<CuppingSessionDocument>
}

export const loaders: CuppingSessionLoaders = {
  // cuppingSessions: async (ids, models, user) => {
  //   const {CuppingSession} = models
  //   const cuppingSessions = await CuppingSession.findByUser(user, {_id: ids})
  //   return ids.map(id => {
  //     const cuppingSession = cuppingSessions.find(cuppingSession => cuppingSession._id.toString() === id.toString())
  //     if (!cuppingSession) return null
  //     return cuppingSession
  //   })
  // },
}

export const schema = {typeDefs, resolvers}
