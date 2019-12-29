import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface RegionDocument extends DocumentWithTimestamps {
  name: string
  country?: mongoose.Types.ObjectId
}

const Region = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'country',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<RegionDocument>('region', Region)
