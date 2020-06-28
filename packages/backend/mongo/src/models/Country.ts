import {model} from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {BaseDocument} from '../abstract/documents'
import {BasePublicSchema} from '../abstract/schemas'

export interface CountryDocument extends BaseDocument {
  name: string
  nameEn: string
  sovereignId: string
  population: {
    estimate: number
    rank: number
    year: number
  }
  geography: {
    region: string
    subRegion: string
    subUnit: string
    sovereignNation: string
  }
}

const Country = extendSchema(
  BasePublicSchema,
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameEn: {
      type: String,
    },
    sovereignId: {
      type: String,
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

export const CountryModel = model<CountryDocument>('country', Country, 'countries')
