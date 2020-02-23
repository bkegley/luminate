import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface DeviceDocument extends DocumentWithTimestamps {
  name: string
  visibleTo: Array<mongoose.Types.ObjectId>
}

export interface DeviceModel extends WithAuthenticatedMethods<DeviceDocument> {}

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

Device.loadClass(AuthenticatedEntity)

export default mongoose.model<DeviceDocument, DeviceModel>('device', Device)
