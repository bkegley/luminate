import mongoose from 'mongoose'

const Farm = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'country',
    },
    region: {
      type: mongoose.Types.ObjectId,
      ref: 'region',
    },
  },
  {timestamps: true},
)

export default mongoose.model('farm', Farm)
