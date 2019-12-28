import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface IRegion extends DocumentWithTimestamps {
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

export default mongoose.model<IRegion>('region', Region)
