import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema} from '../abstract/schemas'
import {AuthenticatedDocument} from '../abstract/documents'

export interface AccountDocument extends AuthenticatedDocument {
  name: string
}

const Account = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
)

export const AccountModel = mongoose.model<AccountDocument>('account', Account)
