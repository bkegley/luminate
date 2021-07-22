import {model} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface BrewerDocument extends AuthenticatedDocument {
  name: string
  description?: string
  type?: string
}

export const BrewerSchema = extendSchema<BrewerDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ['AUTODRIP', 'FULL_IMMERSION', 'POUROVER', 'ESPRESSO'],
    },
  },
  {
    timestamps: true,
  },
)

export const BrewerModel = model('brewer', BrewerSchema)
