import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import {ScopeDocument} from './Scope'

export interface RoleDocument extends DocumentWithTimestamps {
  name: string
  scopes?: string[]
}

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scopes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scope',
      },
    ],
  },
  {timestamps: true},
)

export default mongoose.model<RoleDocument>('role', RoleSchema)
