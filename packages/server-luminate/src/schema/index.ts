import merge from 'lodash.merge'

import {typeDefs as coffeeTypeDefs, resolvers as coffeeResolvers, loaders as coffeeLoaders} from './Coffee'
import {typeDefs as countryTypeDefs, resolvers as countryResolvers, loaders as countryLoaders} from './Country'
import {typeDefs as defaultTypeDefs} from './defaults'
import {typeDefs as farmTypeDefs, resolvers as farmResolvers, loaders as farmLoaders} from './Farm'
import {typeDefs as farmZoneTypeDefs, resolvers as farmZoneResolvers, loaders as farmZoneLoaders} from './FarmZone'
import {typeDefs as regionTypeDefs, resolvers as regionResolvers, loaders as regionLoaders} from './Region'
import {typeDefs as varietyTypeDefs, resolvers as varietyResolvers, loaders as varietyLoaders} from './Variety'

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

export const loaders = merge(coffeeLoaders, countryLoaders, farmLoaders, farmZoneLoaders, regionLoaders, varietyLoaders)
