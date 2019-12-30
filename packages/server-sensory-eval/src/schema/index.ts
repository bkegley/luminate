import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'

import {
  typeDefs as cuppingTypeDefs,
  resolvers as cuppingResolvers,
  loaders as cuppingLoaders,
  CuppingLoaders,
} from './Cupping'

export const typeDefs = [sharedTypeDefs, cuppingTypeDefs]

export const resolvers = merge(cuppingResolvers)

export interface Loaders extends CuppingLoaders {}

export const loaders: Loaders = merge(cuppingLoaders)
