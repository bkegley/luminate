import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import extendSchema from '../extendSchema'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

export interface CuppingSessionDocument extends DocumentWithTimestamps {
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

export interface CuppingSessionModel extends WithAuthenticatedMethods<CuppingSessionDocument> {}

const ScoreSheet = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
)

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

CuppingSession.loadClass(AuthenticatedEntity)

export default mongoose.model<CuppingSessionDocument, CuppingSessionModel>('cuppingSession', CuppingSession)
