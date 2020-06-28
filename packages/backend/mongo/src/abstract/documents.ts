import * as mongoose from 'mongoose'

export interface BaseDocument extends mongoose.Document {
  id: string
  createdAt: string
  updatedAt: string
}

export interface AuthenticatedDocument extends BaseDocument {
  createdByUser: string
  createdByAccount: string
  readAccess: string[]
  writeAccess: string[]
  adminAccess: string[]
  permissionType: Array<'public' | 'private'>
}
