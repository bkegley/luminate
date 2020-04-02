import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema} from '../abstract/schemas'
import {AuthenticatedDocument} from '../abstract/documents'

export interface RegionDocument extends AuthenticatedDocument {
  name: string
  country?: string
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
