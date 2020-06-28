import {model, Schema, Document, Types} from 'mongoose'
import extendSchema from '../utils/extendSchema'
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'

export interface CuppingSessionDocument extends AuthenticatedDocument {
  description: string
  sessionCoffees?: [SessionCoffeeDocument]
}

export interface ScoreSheetDocument extends Document {
  userId: string
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

export interface SessionCoffeeDocument extends Document {
  sampleNumber: string
  coffee: string
  scoreSheets: Array<ScoreSheetDocument>
}

const ScoreSheet = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user',
  },
  fragranceAroma: {
    type: Number,
    default: 0,
  },
  flavor: {
    type: Number,
    default: 0,
  },
  aftertaste: {
    type: Number,
    default: 0,
  },
  acidity: {
    type: Number,
    default: 0,
  },
  body: {
    type: Number,
    default: 0,
  },
  uniformity: {
    type: Number,
    default: 0,
  },
  cleanCup: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  sweetness: {
    type: Number,
    default: 0,
  },
  overall: {
    type: Number,
    default: 0,
  },
  taints: {
    numberOfCups: {
      type: Number,
      default: 0,
    },
    intensity: {
      type: Number,
      default: 0,
    },
  },
  defects: {
    numberOfCups: {
      type: Number,
      default: 0,
    },
    intensity: {
      type: Number,
      default: 0,
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
    locked: {
      type: Boolean,
      default: false,
    },
    sessionCoffees: [
      {
        sampleNumber: {
          type: String,
          required: true,
        },
        coffee: {
          type: Types.ObjectId,
          ref: 'coffee',
          required: true,
        },
        scoreSheets: [{type: ScoreSheet}],
      },
    ],
  },
  {timestamps: true},
)

export const CuppingSessionModel = model<CuppingSessionDocument>('cuppingSession', CuppingSession)
