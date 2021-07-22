import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface BrewGuideDocument extends AuthenticatedDocument {
  name: string
  recipeId: Schema.Types.ObjectId
}

export const BrewGuideSchema = extendSchema<BrewGuideDocument>(
  BaseAuthenticatedSchema,
  {
    name: {
      type: String,
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'recipe',
    },
  },
  {
    timestamps: true,
  },
)

export const BrewGuideModel = model('brewGuide', BrewGuideSchema)
