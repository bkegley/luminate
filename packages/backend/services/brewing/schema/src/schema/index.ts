import merge from 'lodash.merge'

import {typeDefs as sharedTypeDefs} from '@luminate/graphql-utils'

import {schema as brewerSchema} from './Brewer'

import {schema as grinderSchema} from './Grinder'

import {loaders as cuppingSessionLoaders, CuppingSessionLoaders, schema as cuppingSessionSchema} from './CuppingSession'

import {schema as deviceSchema} from './Device'

import {schema as scoreSheetSchema} from './ScoreSheet'

export const schemas = [
  {typeDefs: sharedTypeDefs},
  cuppingSessionSchema,
  deviceSchema,
  scoreSheetSchema,
  brewerSchema,
  grinderSchema,
]

export interface Loaders extends CuppingSessionLoaders {}

export const loaders: Loaders = merge(cuppingSessionLoaders)
