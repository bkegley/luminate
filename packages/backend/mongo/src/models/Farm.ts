import {model, Schema, Types} from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface FarmDocument extends AuthenticatedDocument {
  name: string
  country?: string
  region?: string
}

const FarmZone = new Schema({
  name: {
    type: String,
    required: true,
  },
})

const Farm = extendSchema(
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

export const FarmModel = model<FarmDocument>('farm', Farm)
