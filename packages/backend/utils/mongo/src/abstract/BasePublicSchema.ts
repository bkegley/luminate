import {Schema} from 'mongoose'

export const BasePublicSchema = new Schema({
  permissionType: {
    type: String,
    enum: ['public'],
    default: 'public',
  },
})
