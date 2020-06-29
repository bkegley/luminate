import {model, Types} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

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
      type: Types.ObjectId,
      ref: 'country',
    },
    region: {
      type: Types.ObjectId,
      ref: 'region',
    },
    farm: {
      type: Types.ObjectId,
      ref: 'farm',
    },
    farmZone: {
      type: Types.ObjectId,
    },
    varieties: [
      {
        type: Types.ObjectId,
        ref: 'variety',
      },
    ],
    elevation: {
      type: String,
    },
    components: [
      {
        coffee: Types.ObjectId,
        percentage: Number,
      },
    ],
  },
  {timestamps: true},
)

export const CoffeeModel = model<CoffeeDocument>('coffee', Coffee)
