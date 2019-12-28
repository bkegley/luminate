import merge from 'lodash.merge'

import {sharedTypeDefs} from '@luminate/graphql-utils'
import {typeDefs as userTypeDefs, resolvers as userResolvers, loaders as userLoaders, UserLoaders} from './User'
import {BatchLoadFn} from 'dataloader'

export const typeDefs = [sharedTypeDefs, userTypeDefs]

export const resolvers = merge(userResolvers)

export interface Loaders extends UserLoaders {}

export const loaders: Loaders = merge(userLoaders)
