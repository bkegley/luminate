import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface CoffeeDocument extends AuthenticatedDocument {
  name: string
  country?: mongoose.Types.ObjectId
  region?: mongoose.Types.ObjectId
  farm?: mongoose.Types.ObjectId
  farmZone?: mongoose.Types.ObjectId
  varieties?: Array<mongoose.Types.ObjectId>
  elevation: string
  components: Array<{coffee: mongoose.Types.ObjectId; percentage: number}>
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
