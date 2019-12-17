import mongoose from 'mongoose'

const FarmZone = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
  },
  {timestamps: true},
)

export default mongoose.model('farmZone', FarmZone)
