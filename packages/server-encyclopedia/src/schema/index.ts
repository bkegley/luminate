import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'

import {loaders as coffeeLoaders, CoffeeLoaders, schema as coffeeSchema} from './Coffee'

import {loaders as countryLoaders, CountryLoaders, schema as countrySchema} from './Country'

import {loaders as deviceLoaders, DeviceLoaders, schema as deviceSchema} from './Device'

import {loaders as farmLoaders, FarmLoaders, schema as farmSchema} from './Farm'

import {loaders as farmZoneLoaders, FarmZoneLoaders, schema as farmZoneSchema} from './FarmZone'

import {loaders as regionLoaders, RegionLoaders, schema as regionSchema} from './Region'

import {loaders as roastLoaders, RoastLoaders, schema as roastSchema} from './Roast'

import {loaders as varietyLoaders, VarietyLoaders, schema as varietySchema} from './Variety'

export const schemas = [
  {typeDefs: sharedTypeDefs},
  coffeeSchema,
  countrySchema,
  deviceSchema,
  farmSchema,
  farmZoneSchema,
  regionSchema,
  roastSchema,
  varietySchema,
]

export interface Loaders
  extends CoffeeLoaders,
    CountryLoaders,
    DeviceLoaders,
    FarmLoaders,
    FarmZoneLoaders,
    RegionLoaders,
    RoastLoaders,
    VarietyLoaders {}

export const loaders: Loaders = merge(
  coffeeLoaders,
  countryLoaders,
  deviceLoaders,
  farmLoaders,
  farmZoneLoaders,
  regionLoaders,
  roastLoaders,
  varietyLoaders,
)
