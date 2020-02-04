import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface RoastDocument extends DocumentWithTimestamps {
  name: string
}

export interface RoastModel extends WithAuthenticatedMethods<RoastDocument> {}

const Roast = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
)

Roast.loadClass(AuthenticatedEntity)

export default mongoose.model<RoastDocument, RoastModel>('roast', Roast)
