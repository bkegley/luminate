import {model, Types} from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface NoteDocument extends AuthenticatedDocument {
  entityId: string
  content: string
  field: string
}

const Note = extendSchema(
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

export const NoteModel = model<NoteDocument>('note', Note)
