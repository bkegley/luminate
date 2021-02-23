import {model, Types} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface NoteDocument extends AuthenticatedDocument {
  entityId: string
  content: string
  field: string
}

export const NoteSchema = extendSchema(
  BaseAuthenticatedSchema,
  {
    entityId: {
      type: Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true!,
    },
  },
  {timestamps: true},
)

export const NoteModel = model<NoteDocument>('note', NoteSchema)
