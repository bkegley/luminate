import {model} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface ViewDocument extends AuthenticatedDocument {
  name: string
  description?: string
  jsonString?: string
}

export const ViewSchema = extendSchema<ViewDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    jsonString: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const ViewModel = model<ViewDocument>('view', ViewSchema)
