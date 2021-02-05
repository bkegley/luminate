import {gql, ApolloError} from 'apollo-server-express'
import {GraphQLScalarType, Kind} from 'graphql'
import {Resolvers} from '../../types'

//const resolvers: Resolvers = {
//Query: {
//listScoreSheets: async (parent, {sessionCoffeeId}, {services}) => {
//return services.cuppingSession.listScoreSheetsBySessionCoffee(sessionCoffeeId)
//},
//getScoreSheet: async (parent, {sessionCoffeeId, scoreSheetId}, {services}) => {
//return services.cuppingSession.getScoreSheet(sessionCoffeeId, scoreSheetId)
//},
//},
//Mutation: {
//createScoreSheet: async (parent, {sessionCoffeeId, input}, {services}) => {
//return services.cuppingSession.createScoreSheet({sessionCoffeeId, input})
//},
//updateScoreSheet: async (parent, {scoreSheetId, sessionCoffeeId, input}, {services}) => {
//return services.cuppingSession.updateScoreSheet({scoreSheetId, sessionCoffeeId, input})
//},
//deleteScoreSheet: async (parent, {id}, {services}) => {
//return services.cuppingSession.deleteScoreSheetById(id)
//},
//},
//ScoreSheet: {
//// @ts-ignore
//user: parent => {
//return {
//__typename: 'User',
//id: parent.userId,
//}
//},
//totalScore: parent => {
//const {
//fragranceAroma,
//flavor,
//aftertaste,
//acidity,
//body,
//uniformity,
//cleanCup,
//balance,
//sweetness,
//overall,
//taints,
//defects,
//} = parent
//const totalScore =
//fragranceAroma + flavor + aftertaste + acidity + body + uniformity + cleanCup + balance + sweetness + overall
//const totalDefects =
//taints.numberOfCups || 0 * taints.intensity || 0 + defects.numberOfCups || 0 * defects.intensity || 0
//return totalScore - totalDefects
//},
//},
//ScoreFloat: new GraphQLScalarType({
//name: 'ScoreFloat',
//description: 'Valid cupping score input',
//parseValue: value => value,
//serialize: value => value,
//parseLiteral: ast => {
//// @ts-ignore
//const {kind, value} = ast
//if (kind !== Kind.FLOAT && kind !== Kind.INT) {
//throw new Error('Must be a float or int')
//}
//if (value < 0 || value > 10) {
//throw new Error('Must be between 0 and 10')
//}

//if ((value * 4) % 1 !== 0) {
//throw new Error('Must be in .25 point intervals')
//}

//return value
//},
//}),
//}

//export const schema = {typeDefs, resolvers}
