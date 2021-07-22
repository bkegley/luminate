import {model} from 'mongoose'
import {extendSchema, BaseAuthenticatedSchema, AuthenticatedDocument} from '@luminate/mongo-utils'

export interface EvaluationDocument extends AuthenticatedDocument {
  date: Date
}

export const EvaluationSchema = extendSchema<EvaluationDocument>(
  BaseAuthenticatedSchema,
  {
    date: Date,
  },
  {
    timestamps: true,
  },
)

export const EvaluationModel = model('evaluation', EvaluationSchema)
