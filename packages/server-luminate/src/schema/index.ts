import merge from 'lodash.merge'

import {typeDefs as coffeeTypeDefs, resolvers as coffeeResolvers} from './Coffee'
import {typeDefs as countryTypeDefs, resolvers as countryResolvers} from './Country'
import {typeDefs as defaultTypeDefs} from './defaults'
import {typeDefs as farmTypeDefs, resolvers as farmResolvers} from './Farm'
import {typeDefs as farmZoneTypeDefs, resolvers as farmZoneResolvers} from './FarmZone'
import {typeDefs as regionTypeDefs, resolvers as regionResolvers} from './Region'
import {typeDefs as varietyTypeDefs, resolvers as varietyResolvers} from './Variety'

export const typeDefs = [
  coffeeTypeDefs,
  countryTypeDefs,
  defaultTypeDefs,
  farmTypeDefs,
  farmZoneTypeDefs,
  regionTypeDefs,
  varietyTypeDefs,
]

export const resolvers = merge(
  coffeeResolvers,
  countryResolvers,
  farmResolvers,
  farmZoneResolvers,
  regionResolvers,
  varietyResolvers,
)
