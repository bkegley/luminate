import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface FarmDocument extends DocumentWithTimestamps {
  name: string
  country?: mongoose.Types.ObjectId
  region?: mongoose.Types.ObjectId
}

export interface FarmModel extends WithAuthenticatedMethods<FarmDocument> {}

const Farm = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'country',
    },
    region: {
      type: mongoose.Types.ObjectId,
      ref: 'region',
    },
  },
  {timestamps: true},
)

Farm.loadClass(AuthenticatedEntity)

export default mongoose.model<FarmDocument, FarmModel>('farm', Farm)
