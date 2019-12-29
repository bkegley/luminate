import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface FarmZoneDocument extends DocumentWithTimestamps {
  name: string
  farm?: mongoose.Types.ObjectId
}

const FarmZone = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
  },
  {timestamps: true},
)

export default mongoose.model<FarmZoneDocument>('farmZone', FarmZone)
