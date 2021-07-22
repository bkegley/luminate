import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface RecipeDocument extends AuthenticatedDocument {
  name: string
  brewerId: Schema.Types.ObjectId
  grinderId: Schema.Types.ObjectId
  grindSetting?: number
  note?: string
}

export const RecipeSchema = extendSchema<RecipeDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
      required: true,
    },
    brewerId: {
      type: Schema.Types.ObjectId,
      ref: 'brewer',
    },
    grinderId: {
      type: Schema.Types.ObjectId,
      ref: 'grinder',
    },
    grindSetting: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const RecipeModel = model('recipe', RecipeSchema)
