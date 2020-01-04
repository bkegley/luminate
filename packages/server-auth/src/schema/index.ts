import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'
import {loaders as roleLoaders, RoleLoaders, schema as roleSchema} from './Role'
import {loaders as scopeLoaders, ScopeLoaders, schema as scopeSchema} from './Scope'
import {loaders as userLoaders, UserLoaders, schema as userSchema} from './User'

export const schemas = [{typeDefs: sharedTypeDefs}, roleSchema, scopeSchema, userSchema]

export interface Loaders extends RoleLoaders, ScopeLoaders, UserLoaders {}

export const loaders: Loaders = merge(roleLoaders, scopeLoaders, userLoaders)
