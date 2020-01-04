import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface ScopeDocument extends DocumentWithTimestamps {
  name: string
  resource: string
  operation: 'read' | 'write'
  category?: string
}

export const ScopeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    resource: {
      type: String,
      required: true,
    },
    operation: {
      type: String,
      enum: ['read', 'write'],
      required: true,
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'scopeCategory',
    // },
  },
  {
    timestamps: true,
  },
)

ScopeSchema.pre<ScopeDocument>('save', async function(next) {
  const name = `${this.operation}: ${this.resource}`
  this.name = name
  next()
})

export default mongoose.model<ScopeDocument>('scope', ScopeSchema)
