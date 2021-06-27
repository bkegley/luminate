import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, BaseDocument} from '@luminate/mongo-utils'

export interface RefreshTokenDocument extends BaseDocument {
  user: string
  token: string
  expiresAt: Date
  createByIP: string
  revokedAt: Date
  revokedByIP: string
}

export const RefreshTokenSchema = extendSchema<RefreshTokenDocument>(
  BaseAuthenticatedSchema,
  {
    user: {
      // @ts-ignore
      type: Schema.Types.ObjectId,
    },
    token: String,
    expiresAt: Date,
    createdByIP: String,
    revokedAt: Date,
    revokedByIP: String,
  },
  {
    timestamps: true,
  },
)

export const RefreshTokenModel = model('refreshToken', RefreshTokenSchema)
