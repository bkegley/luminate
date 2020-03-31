import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface CountryDocument extends AuthenticatedDocument {
  name: string
}

const Country = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const CountryModel = mongoose.model<CountryDocument>('country', Country, 'countries')
