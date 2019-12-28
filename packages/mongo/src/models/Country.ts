import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface ICountry extends DocumentWithTimestamps {
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

export default mongoose.model<ICountry>('country', Country, 'countries')
