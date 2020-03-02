import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

const typeDefs = gql`
  type ScoreSheet @key(fields: "id") {
    id: ID!
    totalScore: Float
    createdAt: String!
    updatedAt: String!
  }

  input CreateScoreSheetInput {
    totalScore: Float
  }

  input UpdateScoreSheetInput {
    totalScore: Float
  }

  extend type Mutation {
    createScoreSheet(cuppingSessionId: ID!, sampleNumber: ID!, input: CreateScoreSheetInput!): CuppingSession
    updateScoreSheet(scoreSheetId: ID!, sessionCoffeeId: ID!, input: UpdateScoreSheetInput!): CuppingSession
    deleteScoreSheet(scoreSheetId: ID!, sessionCoffeeId: ID!): CuppingSession
  }
`

const resolvers: Resolvers = {
  // @ts-ignore
  Mutation: {
    createScoreSheet: async (parent, {cuppingSessionId, sampleNumber, input}, {models, user}) => {
      const {CuppingSession} = models
      const cuppingSession = await CuppingSession.findOneAndUpdateByUser(
        user,
        {_id: cuppingSessionId, 'sessionCoffees.sampleNumber': sampleNumber},
        {$push: {'sessionCoffees.$.scoreSheets': input}},
        {new: true},
      )
      return cuppingSession
    },
    updateScoreSheet: async (parent, {scoreSheetId, sessionCoffeeId, input}, {models, user}) => {
      const {CuppingSession} = models
      const cuppingSession = await CuppingSession.findOneAndUpdateByUser(
        user,
        {sessionCoffees: {$elemMatch: {_id: sessionCoffeeId, 'scoreSheets._id': scoreSheetId}}},
        {$set: {'sessionCoffees.$[outer].scoreSheets.$[inner]': {_id: scoreSheetId, ...input}}},
        {
          new: true,
          // @ts-ignore
          arrayFilters: [{'outer._id': sessionCoffeeId}, {'inner._id': scoreSheetId}],
        },
      )
      return cuppingSession
    },
    deleteScoreSheet: async (parent, {sessionCoffeeId, scoreSheetId}, {models, user}) => {
      const {CuppingSession} = models
      const scoreSheet = await CuppingSession.findOneAndUpdateByUser(
        user,
        {'sessionCoffees._id': sessionCoffeeId},
        {$pull: {'sessionCoffees.$.scoreSheets': {_id: scoreSheetId}}},
      )
      if (!scoreSheet) {
        throw new ApolloError('Document not found')
      }
      return scoreSheet
    },
  },
}

export const schema = {typeDefs, resolvers}
