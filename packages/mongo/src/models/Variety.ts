import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface IVariety extends DocumentWithTimestamps {
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

export default mongoose.model<IVariety>('variety', Variety, 'varieties')
