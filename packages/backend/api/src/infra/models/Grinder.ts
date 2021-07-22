import {model} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface GrinderDocument extends AuthenticatedDocument {
  name: string
  description?: string
  burrSet?: string
}

export const GrinderSchema = extendSchema<GrinderDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    burrSet: {
      type: String,
      enum: ['CONICAL_BURR', 'FLAT_BURR', 'BLADE'],
    },
  },
  {
    timestamps: true,
  },
)

export const GrinderModel = model('grinder', GrinderSchema)
