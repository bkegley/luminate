import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'
import {loaders as userLoaders, UserLoaders, schema as userSchema} from './User'

export const schemas = [{typeDefs: sharedTypeDefs}, userSchema]

export interface Loaders extends UserLoaders {}

export const loaders: Loaders = merge(userLoaders)
