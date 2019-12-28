import * as mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface IFarmZone extends DocumentWithTimestamps {
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

export default mongoose.model<IFarmZone>('farmZone', FarmZone)
