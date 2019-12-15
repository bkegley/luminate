import merge from 'lodash.merge'

import {typeDefs as coffeeTypeDefs, resolvers as coffeeResolvers} from './Coffee'
import {typeDefs as countryTypeDefs, resolvers as countryResolvers} from './Country'
import {typeDefs as defaultTypeDefs} from './defaults'
import {typeDefs as regionTypeDefs} from './Region'
import {typeDefs as userTypeDefs} from './User'
import {typeDefs as varietyTypeDefs} from './Variety'

export const typeDefs = [
  coffeeTypeDefs,
  countryTypeDefs,
  defaultTypeDefs,
  regionTypeDefs,
  userTypeDefs,
  varietyTypeDefs,
]

export const resolvers = merge(coffeeResolvers, countryResolvers)
