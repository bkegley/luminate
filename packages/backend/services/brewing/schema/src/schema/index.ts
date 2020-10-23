import merge from 'lodash.merge'

import {typeDefs as sharedTypeDefs} from '@luminate/graphql-utils'
import {schema as brewerSchema} from './Brewer'
import {loaders as cuppingSessionLoaders, CuppingSessionLoaders, schema as cuppingSessionSchema} from './CuppingSession'
import {schema as deviceSchema} from './Device'
import {schema as grinderSchema} from './Grinder'
import {schema as recipesSchema} from './Recipe'

import {schema as scoreSheetSchema} from './ScoreSheet'

export const schemas = [
  {typeDefs: sharedTypeDefs},
  cuppingSessionSchema,
  deviceSchema,
  scoreSheetSchema,
  brewerSchema,
  grinderSchema,
  recipesSchema,
]

export interface Loaders extends CuppingSessionLoaders {}

export const loaders: Loaders = merge(cuppingSessionLoaders)
