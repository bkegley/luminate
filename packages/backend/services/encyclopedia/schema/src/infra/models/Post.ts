import {model, Types} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

export interface PostDocument extends AuthenticatedDocument {
  relations: {entity: string; id: string}[]
  title: string
  content: string
}

export const PostSchema = extendSchema<PostDocument>(
  BaseAuthenticatedSchema,
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    relations: [
      {
        entity: {
          type: String,
        },
        id: {
          type: Types.ObjectId,
        },
      },
    ],
  },
  {timestamps: true},
)

export const PostModel = model<PostDocument>('post', PostSchema)
