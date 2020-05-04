import {gql, ApolloError} from 'apollo-server-express'
import {GraphQLScalarType, Kind} from 'graphql'
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
    userId: ID
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
    userId: ID
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

  extend type Query {
    listScoreSheets(sessionCoffeeId: ID!): [ScoreSheet]
    getScoreSheet(sessionCoffeeId: ID!, scoreSheetId: ID!): ScoreSheet
  }

  extend type Mutation {
    createScoreSheet(sessionCoffeeId: ID!, input: CreateScoreSheetInput!): ScoreSheet
    updateScoreSheet(scoreSheetId: ID!, sessionCoffeeId: ID!, input: UpdateScoreSheetInput!): ScoreSheet
    deleteScoreSheet(id: ID!): CuppingSession
  }
`

const resolvers: Resolvers = {
  Query: {
    listScoreSheets: async (parent, {sessionCoffeeId}, {services}) => {
      return services.cuppingSession.listScoreSheetsBySessionCoffee(sessionCoffeeId)
    },
    getScoreSheet: async (parent, {sessionCoffeeId, scoreSheetId}, {services}) => {
      return services.cuppingSession.getScoreSheet(sessionCoffeeId, scoreSheetId)
    },
  },
  Mutation: {
    createScoreSheet: async (parent, {sessionCoffeeId, input}, {services}) => {
      return services.cuppingSession.createScoreSheet({sessionCoffeeId, input})
    },
    updateScoreSheet: async (parent, {scoreSheetId, sessionCoffeeId, input}, {services}) => {
      return services.cuppingSession.updateScoreSheet({scoreSheetId, sessionCoffeeId, input})
    },
    deleteScoreSheet: async (parent, {id}, {services}) => {
      return services.cuppingSession.deleteScoreSheetById(id)
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
