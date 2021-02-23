import {model, Types} from 'mongoose'
import {extendSchema, BasePublicSchema, BaseDocument} from '@luminate/mongo-utils'

export interface RegionDocument extends BaseDocument {
  name: string
  country?: string
}

export const RegionSchema = extendSchema(
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

export const RegionModel = model<RegionDocument>('region', RegionSchema)
