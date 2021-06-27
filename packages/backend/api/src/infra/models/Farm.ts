import {model, Schema, Types} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface FarmDocument extends AuthenticatedDocument {
  name: string
  country?: Types.ObjectIdConstructor
  region?: Types.ObjectIdConstructor
  farmZones: FarmZoneDocument[]
}

export interface FarmZoneDocument {
  name: string
}

const FarmZone = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export const FarmSchema = extendSchema<FarmDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: Types.ObjectId,
      ref: 'country',
    },
    region: {
      type: Types.ObjectId,
      ref: 'region',
    },
    farmZones: [FarmZone],
  },
  {timestamps: true},
)

export const FarmModel = model<FarmDocument>('farm', FarmSchema)
