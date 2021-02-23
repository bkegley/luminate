//import {gql} from 'apollo-server-express'
//import {Resolvers} from '../types'

//const resolvers: Resolvers = {
//Query: {
//listCountries: async (parent, args, {services}) => {
//return services.country.getConnectionResults(args)
//},
//getCountry: async (parent, {id}, {services}, info) => {
//return services.country.getById(id)
//},
//},
//Country: {
//regions: async (parent, args, {services}) => {
//return services.region.listByCountryId(parent.id)
//},
//},
//}

//export const schema = {typeDefs, resolvers}
