import merge from 'lodash.merge'

import {typeDefs as sharedTypeDefs} from '@luminate/graphql-utils'

import {loaders as cuppingSessionLoaders, CuppingSessionLoaders, schema as cuppingSessionSchema} from './CuppingSession'

import {schema as scoreSheetSchema} from './ScoreSheet'

export const schemas = [{typeDefs: sharedTypeDefs}, cuppingSessionSchema, scoreSheetSchema]

export interface Loaders extends CuppingSessionLoaders {}

export const loaders: Loaders = merge(cuppingSessionLoaders)
