import merge from 'lodash.merge'

import {
  typeDefs as coffeeTypeDefs,
  resolvers as coffeeResolvers,
  loaders as coffeeLoaders,
  CoffeeLoaders,
} from './Coffee'
import {
  typeDefs as countryTypeDefs,
  resolvers as countryResolvers,
  loaders as countryLoaders,
  CountryLoaders,
} from './Country'
import {typeDefs as defaultTypeDefs} from './defaults'
import {typeDefs as farmTypeDefs, resolvers as farmResolvers, loaders as farmLoaders, FarmLoaders} from './Farm'
import {
  typeDefs as farmZoneTypeDefs,
  resolvers as farmZoneResolvers,
  loaders as farmZoneLoaders,
  FarmZoneLoaders,
} from './FarmZone'
import {
  typeDefs as regionTypeDefs,
  resolvers as regionResolvers,
  loaders as regionLoaders,
  RegionLoaders,
} from './Region'
import {
  typeDefs as varietyTypeDefs,
  resolvers as varietyResolvers,
  loaders as varietyLoaders,
  VarietyLoaders,
} from './Variety'

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

export interface Loaders
  extends CoffeeLoaders,
    CountryLoaders,
    FarmLoaders,
    FarmZoneLoaders,
    RegionLoaders,
    VarietyLoaders {}

export const loaders: Loaders = merge(
  coffeeLoaders,
  countryLoaders,
  farmLoaders,
  farmZoneLoaders,
  regionLoaders,
  varietyLoaders,
)
