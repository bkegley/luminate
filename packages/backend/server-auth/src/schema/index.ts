import merge from 'lodash.merge'

import {typeDefs as sharedTypeDefs} from '@luminate/graphql-utils'
import {schema as accountSchema} from './Account'
import {schema as roleSchema} from './Role'
import {schema as userSchema} from './User'

export const schemas = [{typeDefs: sharedTypeDefs}, accountSchema, roleSchema, userSchema]

export interface Loaders {}

export const loaders: Loaders = merge({})
