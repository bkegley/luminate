import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface NoteDocument extends DocumentWithTimestamps {
  entityId: mongoose.Types.ObjectId
  content: string
  field: string
}

export interface NoteModel extends WithAuthenticatedMethods<NoteDocument> {}

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

Note.loadClass(AuthenticatedEntity)

export default mongoose.model<NoteDocument, NoteModel>('note', Note)
