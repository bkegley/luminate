import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface AccountDocument extends DocumentWithTimestamps {
  name: string
}

const Account = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
)

export default mongoose.model<AccountDocument>('account', Account)
