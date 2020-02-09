import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface VarietyDocument extends DocumentWithTimestamps {
  name: string
  background?: string
}

export interface VarietyModel extends WithAuthenticatedMethods<VarietyDocument> {}

const Variety = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

Variety.loadClass(AuthenticatedEntity)

export default mongoose.model<VarietyDocument, VarietyModel>('variety', Variety, 'varieties')
