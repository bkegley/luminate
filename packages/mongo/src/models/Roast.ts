import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface RoastDocument extends DocumentWithTimestamps {
  name: string
}

const Roast = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
)

export default mongoose.model<RoastDocument>('roast', Roast)
