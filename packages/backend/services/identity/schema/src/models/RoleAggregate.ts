import {model, Schema, Document} from 'mongoose'

export interface RoleAggregateDocument extends Document {
  name: string
  accountId: string
}

export const RoleAggregate = new Schema({
  name: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
})

export const RoleAggregateModel = model<RoleAggregateDocument>('roleAggregate', RoleAggregate)
