import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BasePublicSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface ScopeDocument extends DocumentWithTimestamps {
  name: string
  resource: string
  operation: 'read' | 'write'
  category?: string
}

export interface ScopeModel extends WithAuthenticatedMethods<ScopeDocument> {}

export const ScopeSchema = extendSchema(
  BasePublicSchema,
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

ScopeSchema.loadClass(AuthenticatedEntity)

export default mongoose.model<ScopeDocument, ScopeModel>('scope', ScopeSchema)
