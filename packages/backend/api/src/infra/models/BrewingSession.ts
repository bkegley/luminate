import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface BrewingSessionDocument extends AuthenticatedDocument {
  date?: string
  description?: string
  brewGuideId: Schema.Types.ObjectId
}

export const BrewingSessionSchema = extendSchema<BrewingSessionDocument>(
  BaseAuthenticatedSchema,
  {
    date: {
      type: String,
    },
    description: {
      type: String,
    },
    brewGuideId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

export const BrewingSessionModel = model('brewingSession', BrewingSessionSchema)
