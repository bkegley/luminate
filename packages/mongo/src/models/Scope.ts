import mongoose from 'mongoose'

export interface IScope extends mongoose.Document {
  name: string
  resource: string
  operation: 'read' | 'write'
  category?: string
  createdAt: Date
  updatedAt: Date
}

export const ScopeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

ScopeSchema.pre<IScope>('save', async function(next) {
  const name = `${this.operation}: ${this.resource}`
  this.name = name
  next()
})

export default mongoose.model<IScope>('scope', ScopeSchema)
