import {model, Types} from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {BasePublicSchema} from '../abstract/schemas'
import {BaseDocument} from '../abstract/documents'

export interface RegionDocument extends BaseDocument {
  name: string
  country?: string
}

const Region = extendSchema(
  BasePublicSchema,
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: Types.ObjectId,
      ref: 'country',
    },
  },
  {
    timestamps: true,
  },
)

export const RegionModel = model<RegionDocument>('region', Region)
