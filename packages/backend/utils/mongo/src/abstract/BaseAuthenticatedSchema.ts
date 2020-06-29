import {Schema, Types} from 'mongoose'

export const BaseAuthenticatedSchema = new Schema({
  createdByUser: {
    type: Types.ObjectId,
  },
  createdByAccount: {
    type: Types.ObjectId,
  },
  readAccess: [
    {
      type: Types.ObjectId,
    },
  ],
  writeAccess: [
    {
      type: Types.ObjectId,
    },
  ],
  adminAccess: [
    {
      type: Types.ObjectId,
    },
  ],
  permissionType: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
})
