import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface IFarm extends DocumentWithTimestamps {
  name: string
  country?: mongoose.Types.ObjectId
  region?: mongoose.Types.ObjectId
}

const Farm = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'country',
    },
    region: {
      type: mongoose.Types.ObjectId,
      ref: 'region',
    },
  },
  {timestamps: true},
)

export default mongoose.model<IFarm>('farm', Farm)
