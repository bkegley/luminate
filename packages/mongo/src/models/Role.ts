import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface RoleDocument extends AuthenticatedDocument {
  name: string
  scopes: string[]
}

const Role = extendSchema(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    scopes: [{type: String}],
  },
  {timestamps: true},
)

export const RoleModel = mongoose.model<RoleDocument>('role', Role)
