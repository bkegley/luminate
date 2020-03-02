import {gql, ApolloError} from 'apollo-server-express'
import {GraphQLScalarType, Kind} from 'graphql'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'

const typeDefs = gql`
  type ScoreSheet @key(fields: "id") {
    id: ID!
    totalScore: Float
    fragranceAroma: ScoreFloat
    flavor: ScoreFloat
    aftertaste: ScoreFloat
    acidity: ScoreFloat
    body: ScoreFloat
    uniformity: ScoreFloat
    cleanCup: ScoreFloat
    balance: ScoreFloat
    sweetness: ScoreFloat
    overall: ScoreFloat
    taints: DefectScore
    defects: DefectScore
    createdAt: String!
    updatedAt: String!
  }

  type DefectScore {
    numberOfCups: Int
    intensity: Float
  }

  scalar ScoreFloat

  input CreateScoreSheetInput {
    fragranceAroma: ScoreFloat
    flavor: ScoreFloat
    aftertaste: ScoreFloat
    acidity: ScoreFloat
    body: ScoreFloat
    uniformity: ScoreFloat
    cleanCup: ScoreFloat
    balance: ScoreFloat
    sweetness: ScoreFloat
    overall: ScoreFloat
    taints: DefectScoreInput
    defects: DefectScoreInput
  }

  input UpdateScoreSheetInput {
    fragranceAroma: ScoreFloat
    flavor: ScoreFloat
    aftertaste: ScoreFloat
    acidity: ScoreFloat
    body: ScoreFloat
    uniformity: ScoreFloat
    cleanCup: ScoreFloat
    balance: ScoreFloat
    sweetness: ScoreFloat
    overall: ScoreFloat
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
  ScoreFloat: new GraphQLScalarType({
    name: 'ScoreFloat',
    description: 'Valid cupping score input',
    parseValue: value => value,
    serialize: value => value,
    parseLiteral: ast => {
      // @ts-ignore
      const {kind, value} = ast
      if (kind !== Kind.FLOAT && kind !== Kind.INT) {
        throw new Error('Must be a float or int')
      }
      if (value < 0 || value > 10) {
        throw new Error('Must be between 0 and 10')
      }

      if ((value * 4) % 1 !== 0) {
        throw new Error('Must be in .25 point intervals')
      }

      return value
    },
  }),
}

export const schema = {typeDefs, resolvers}
