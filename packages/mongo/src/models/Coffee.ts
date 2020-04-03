import mongoose from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface CoffeeDocument extends AuthenticatedDocument {
  name: string
  country?: string
  region?: string
  farm?: string
  farmZone?: string
  varieties?: string[]
  elevation: string
  components: Array<{coffee: string; percentage: number}>
}

const Coffee = extendSchema(
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
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
    farmZone: {
      type: mongoose.Types.ObjectId,
    },
    varieties: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'variety',
      },
    ],
    elevation: {
      type: String,
    },
    components: [
      {
        coffee: mongoose.Types.ObjectId,
        percentage: Number,
      },
    ],
  },
  {timestamps: true},
)

export const CoffeeModel = mongoose.model<CoffeeDocument>('coffee', Coffee)
