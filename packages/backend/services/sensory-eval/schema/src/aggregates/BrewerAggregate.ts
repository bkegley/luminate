import mongoose from 'mongoose'

export interface BrewerDocument extends mongoose.Document {
  name: string
}

const Brewer = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const BrewerAggregate = mongoose.model<BrewerDocument>('brewerAggregate', Brewer)
