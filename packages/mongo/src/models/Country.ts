import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface CountryDocument extends DocumentWithTimestamps {
  name: string
}

export interface CountryModel extends WithAuthenticatedMethods<CountryDocument> {}

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

Country.loadClass(AuthenticatedEntity)

export default mongoose.model<CountryDocument, CountryModel>('country', Country, 'countries')
