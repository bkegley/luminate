import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface RegionDocument extends DocumentWithTimestamps {
  name: string
  country?: mongoose.Types.ObjectId
}

export interface RegionModel extends WithAuthenticatedMethods<RegionDocument> {}

const Region = extendSchema(
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
  },
  {
    timestamps: true,
  },
)

Region.loadClass(AuthenticatedEntity)

export default mongoose.model<RegionDocument, RegionModel>('region', Region)
