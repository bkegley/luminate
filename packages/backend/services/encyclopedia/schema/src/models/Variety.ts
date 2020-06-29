import {model} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface VarietyDocument extends AuthenticatedDocument {
  name: string
  background?: string
}

const Variety = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const VarietyModel = model<VarietyDocument>('variety', Variety, 'varieties')
