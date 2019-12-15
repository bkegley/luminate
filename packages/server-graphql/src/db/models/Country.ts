import mongoose from 'mongoose'

const Country = new mongoose.Schema({
  name: {
    type: String,
  },
})

export default mongoose.model('country', Country, 'countries')
