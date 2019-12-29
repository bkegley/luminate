import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface CoffeeDocument extends DocumentWithTimestamps {
  name: string
  country?: mongoose.Types.ObjectId
  region?: mongoose.Types.ObjectId
  farm?: mongoose.Types.ObjectId
  farmZone?: mongoose.Types.ObjectId
  varieties?: Array<mongoose.Types.ObjectId>
  elevation: string
}

const Coffee = new mongoose.Schema(
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
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
    farmZone: {
      type: mongoose.Types.ObjectId,
      ref: 'farmZone',
    },
    varieties: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'variety',
      },
    ],
    elevation: {
      type: String,
    },
  },
  {timestamps: true},
)

export default mongoose.model<CoffeeDocument>('coffee', Coffee)
