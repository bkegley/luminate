import mongoose from 'mongoose'

export interface RoleDocument extends mongoose.Document {
  name: string
  scopes?: string[]
  createdAt: Date
  updatedAt: Date
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
