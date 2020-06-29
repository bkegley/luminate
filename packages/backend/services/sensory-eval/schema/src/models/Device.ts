import {model} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

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

export const DeviceModel = model<DeviceDocument>('device', Device)
