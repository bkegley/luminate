import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface CuppingDocument extends DocumentWithTimestamps {
  description: string
}

const Cupping = new mongoose.Schema(
  {
    description: {
      type: String,
    },
  },
  {timestamps: true},
)

export default mongoose.model<CuppingDocument>('cupping', Cupping)
