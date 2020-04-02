import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
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
      type: mongoose.SchemaTypes.ObjectId,
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

export const NoteModel = mongoose.model<NoteDocument>('note', Note)
