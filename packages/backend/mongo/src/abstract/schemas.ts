import mongoose from 'mongoose'

export const BasePublicSchema = new mongoose.Schema({
  permissionType: {
    type: String,
    enum: ['public'],
    default: 'public',
  },
})

export const BaseAuthenticatedSchema = new mongoose.Schema({
  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdByAccount: {
    type: mongoose.Schema.Types.ObjectId,
  },
  readAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  writeAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  adminAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  permissionType: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
})
