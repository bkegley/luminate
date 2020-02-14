import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'
import {loaders as accountLoaders, AccountLoaders, schema as accountSchema} from './Account'
import {loaders as roleLoaders, RoleLoaders, schema as roleSchema} from './Role'
import {loaders as userLoaders, UserLoaders, schema as userSchema} from './User'

export const schemas = [{typeDefs: sharedTypeDefs}, accountSchema, roleSchema, userSchema]

export interface Loaders extends AccountLoaders, RoleLoaders, UserLoaders {}

export const loaders: Loaders = merge(accountLoaders, roleLoaders, userLoaders)
