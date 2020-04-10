import mongoose from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface CuppingSessionDocument extends AuthenticatedDocument {
  description: string
  sessionCoffees?: [SessionCoffeeDocument]
}

export interface ScoreSheetDocument extends mongoose.Document {
  fragranceAroma: number
  flavor: number
  aftertaste: number
  acidity: number
  body: number
  uniformity: number
  cleanCup: number
  balance: number
  sweetness: number
  overall: number
  taints: IDefectScore
  defects: IDefectScore
}

interface IDefectScore {
  numberOfCups: number
  intensity: number
}

export interface SessionCoffeeDocument extends mongoose.Document {
  sampleNumber: string
  coffee: string
  scoreSheets: Array<ScoreSheetDocument>
}

const ScoreSheet = new mongoose.Schema({
  fragranceAroma: {
    type: Number,
  },
  flavor: {
    type: Number,
  },
  aftertaste: {
    type: Number,
  },
  acidity: {
    type: Number,
  },
  body: {
    type: Number,
  },
  uniformity: {
    type: Number,
  },
  cleanCup: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  sweetness: {
    type: Number,
  },
  overall: {
    type: Number,
  },
  taints: {
    numberOfCups: {
      type: Number,
    },
    intensity: {
      type: Number,
    },
  },
  defects: {
    numberOfCups: {
      type: Number,
    },
    intensity: {
      type: Number,
    },
  },
})

const CuppingSession = extendSchema(
  BaseAuthenticatedSchema,
  {
    internalId: {
      type: String,
    },
    description: {
      type: String,
    },
    sessionCoffees: [
      {
        sampleNumber: {
          type: String,
          required: true,
        },
        coffee: {
          type: mongoose.Types.ObjectId,
          ref: 'coffee',
          required: true,
        },
        scoreSheets: [{type: ScoreSheet}],
      },
    ],
  },
  {timestamps: true},
)

export const CuppingSessionModel = mongoose.model<CuppingSessionDocument>('cuppingSession', CuppingSession)
