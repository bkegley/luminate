import {model} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface RoleDocument extends AuthenticatedDocument {
  name: string
  scopes: string[]
}

export const RoleSchema = extendSchema<RoleDocument>(
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

export const RoleModel = model<RoleDocument>('role', RoleSchema)
