import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema} from '../abstract/schemas'
import {BaseDocument} from '../abstract/documents'

export interface RegionDocument extends BaseDocument {
  name: string
  country?: mongoose.Types.ObjectId
}

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

export const RegionModel = mongoose.model<RegionDocument>('region', Region)
