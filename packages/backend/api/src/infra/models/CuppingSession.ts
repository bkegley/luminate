import {model, Schema} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface CuppingSessionDocument extends AuthenticatedDocument {
  internalId?: string
  description?: string
  locked?: boolean
  sessionCoffees?: Schema.Types.ObjectId[]
}

export const CuppingSessionSchema = extendSchema<CuppingSessionDocument>(
  BaseAuthenticatedSchema,
  {
    internalId: {
      type: String,
    },
    description: {
      type: String,
    },
    locked: Boolean,
    sessionCoffees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'coffee',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const CuppingSessionModel = model('cuppingSession', CuppingSessionSchema)
