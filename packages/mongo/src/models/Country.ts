import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface CountryDocument extends DocumentWithTimestamps {
  name: string
}

const Country = new mongoose.Schema(
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

export default mongoose.model<CountryDocument>('country', Country, 'countries')
