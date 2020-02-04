import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface FarmZoneDocument extends DocumentWithTimestamps {
  name: string
  farm?: mongoose.Types.ObjectId
}

export interface FarmZoneModel extends WithAuthenticatedMethods<FarmZoneDocument> {}

const FarmZone = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    farm: {
      type: mongoose.Types.ObjectId,
      ref: 'farm',
    },
  },
  {timestamps: true},
)

FarmZone.loadClass(AuthenticatedEntity)

export default mongoose.model<FarmZoneDocument, FarmZoneModel>('farmZone', FarmZone)
