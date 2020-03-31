import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

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

export const VarietyModel = mongoose.model<VarietyDocument>('variety', Variety, 'varieties')
