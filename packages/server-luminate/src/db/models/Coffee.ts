import mongoose from 'mongoose'

const Coffee = new mongoose.Schema(
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
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
    farmZone: {
      type: mongoose.Types.ObjectId,
      ref: 'farmZone',
    },
    varieties: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'variety',
      },
    ],
    elevation: {
      type: String,
    },
  },
  {timestamps: true},
)

export default mongoose.model('coffee', Coffee)
