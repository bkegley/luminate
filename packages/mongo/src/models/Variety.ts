import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface VarietyDocument extends DocumentWithTimestamps {
  name: string
  background?: string
}

const Variety = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<VarietyDocument>('variety', Variety, 'varieties')
