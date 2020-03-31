import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface DeviceDocument extends AuthenticatedDocument {
  name: string
}

const Device = extendSchema(
  BaseAuthenticatedSchema,
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

export const DeviceModel = mongoose.model<DeviceDocument>('device', Device)
