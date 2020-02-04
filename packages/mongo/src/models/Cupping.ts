import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface CuppingDocument extends DocumentWithTimestamps {
  description: string
  coffees?: [CoffeeCuppingDocument]
}

export interface CoffeeCuppingDocument {
  sessionCoffeeId: string
  coffee: string
}

export interface CuppingModel extends WithAuthenticatedMethods<CuppingDocument> {}

const Cupping = extendSchema(
  BaseAuthenticatedSchema,
  {
    description: {
      type: String,
    },
    coffees: [
      {
        sessionCoffeeId: {
          type: String,
          required: true,
        },
        coffee: {
          type: mongoose.Types.ObjectId,
          ref: 'coffee',
          required: true,
        },
      },
    ],
  },
  {timestamps: true},
)

Cupping.loadClass(AuthenticatedEntity)

export default mongoose.model<CuppingDocument, CuppingModel>('cupping', Cupping)
