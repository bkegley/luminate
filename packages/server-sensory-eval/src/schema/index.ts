import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'

import {loaders as cuppingLoaders, CuppingLoaders, schema as cuppingSchema} from './Cupping'

export const schemas = [{typeDefs: sharedTypeDefs}, cuppingSchema]

export interface Loaders extends CuppingLoaders {}

export const loaders: Loaders = merge(cuppingLoaders)
