import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

const typeDefs = gql`
  type ScoreSheet @key(fields: "id") {
    id: ID!
    totalScore: Float
    fragranceAroma: Float
    flavor: Float
    aftertaste: Float
    acidity: Float
    body: Float
    uniformity: Float
    cleanCup: Float
    balance: Float
    sweetness: Float
    overall: Float
    taints: DefectScore
    defects: DefectScore
    createdAt: String!
    updatedAt: String!
  }

  type DefectScore {
    numberOfCups: Int
    intensity: Float
  }

  input CreateScoreSheetInput {
    fragranceAroma: Float
    flavor: Float
    aftertaste: Float
    acidity: Float
    body: Float
    uniformity: Float
    cleanCup: Float
    balance: Float
    sweetness: Float
    overall: Float
    taints: DefectScoreInput
    defects: DefectScoreInput
  }

  input UpdateScoreSheetInput {
    fragranceAroma: Float
    flavor: Float
    aftertaste: Float
    acidity: Float
    body: Float
    uniformity: Float
    cleanCup: Float
    balance: Float
    sweetness: Float
    overall: Float
    taints: DefectScoreInput
    defects: DefectScoreInput
  }

  input DefectScoreInput {
    numberOfCups: Int
    intensity: Float
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
  ScoreSheet: {
    totalScore: parent => {
      const {
        fragranceAroma,
        flavor,
        aftertaste,
        acidity,
        body,
        uniformity,
        cleanCup,
        balance,
        sweetness,
        overall,
        taints,
        defects,
      } = parent
      const totalScore =
        fragranceAroma + flavor + aftertaste + acidity + body + uniformity + cleanCup + balance + sweetness + overall
      const totalDefects =
        taints.numberOfCups || 0 * taints.intensity || 0 + defects.numberOfCups || 0 * defects.intensity || 0
      return totalScore - totalDefects
    },
  },
}

export const schema = {typeDefs, resolvers}
