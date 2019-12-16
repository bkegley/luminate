import mongoose from 'mongoose'

const Country = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('country', Country, 'countries')
