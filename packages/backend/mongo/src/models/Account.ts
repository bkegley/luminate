import {model} from 'mongoose'
import extendSchema from '../utils/extendSchema'
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

export const AccountModel = model<AccountDocument>('account', Account)