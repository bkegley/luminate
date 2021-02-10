import {model} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface AccountDocument extends AuthenticatedDocument {
  name: string
}

export const AccountSchema = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'accounts',
    timestamps: true,
  },
)

export const AccountModel = model('account', AccountSchema)
