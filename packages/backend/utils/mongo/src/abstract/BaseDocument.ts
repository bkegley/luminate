import {Document} from 'mongoose'

export interface BaseDocument extends Document {
  id: string
  createdAt: string
  updatedAt: string
}
