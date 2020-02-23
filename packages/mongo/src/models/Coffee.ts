import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface CoffeeDocument extends DocumentWithTimestamps {
  name: string
  visibleTo: Array<mongoose.Types.ObjectId>
  country?: mongoose.Types.ObjectId
  region?: mongoose.Types.ObjectId
  farm?: mongoose.Types.ObjectId
  farmZone?: mongoose.Types.ObjectId
  varieties?: Array<mongoose.Types.ObjectId>
  elevation: string
  components: Array<{coffee: mongoose.Types.ObjectId; percentage: number}>
}

export interface CoffeeModel extends WithAuthenticatedMethods<CoffeeDocument> {}

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
      ref: 'farmZone',
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

Coffee.loadClass(AuthenticatedEntity)

export default mongoose.model<CoffeeDocument, CoffeeModel>('coffee', Coffee)
