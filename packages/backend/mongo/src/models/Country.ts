import mongoose from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {BaseDocument} from '../abstract/documents'
import {BasePublicSchema} from '../abstract/schemas'

export interface CountryDocument extends BaseDocument {
  name: string
}

const Country = extendSchema(
  BasePublicSchema,
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    population: {
      estimate: {
        type: Number,
      },
      rank: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
    geography: {
      region: {
        type: String,
      },
      subRegion: {
        type: String,
      },
      subUnit: {
        type: String,
      },
      sovereignNation: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
)

export const CountryModel = mongoose.model<CountryDocument>('country', Country, 'countries')
