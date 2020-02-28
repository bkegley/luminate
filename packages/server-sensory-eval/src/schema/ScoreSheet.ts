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
    updateScoreSheet(id: ID!, input: UpdateScoreSheetInput!): CuppingSession
    deleteScoreSheet(id: ID!): CuppingSession
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
    updateScoreSheet: async (parent, {id, input}, {models, user}) => {
      const {CuppingSession} = models
      const cuppingSession = await CuppingSession.findOneAndUpdateByUser(
        user,
        {sessionCoffees: {$elemMatch: {'scoreSheets._id': id}}},
        // {'sessionCoffees.scoreSheets._id': id},
        {$set: {'sessionCoffees.scoreSheets.$$': {_id: id, ...input}}},
        {
          new: true,
        },
      )
      return cuppingSession
    },
    // deleteScoreSheet: async (parent, {id}, {models, user}) => {
    //   const {ScoreSheet} = models
    //   const scoreSheet = await ScoreSheet.findByIdAndDeleteByUser(user, id, {})
    //   if (!scoreSheet) {
    //     throw new ApolloError('Document not found')
    //   }
    //   return scoreSheet
    // },
  },
}

export const schema = {typeDefs, resolvers}
