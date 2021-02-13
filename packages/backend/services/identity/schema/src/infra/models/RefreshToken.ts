import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, BaseDocument} from '@luminate/mongo-utils'

export interface RefreshTokenDocument extends BaseDocument {
  name: string
}

export const RefreshTokenSchema = extendSchema(
  BaseAuthenticatedSchema,
  {
    user: {
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
