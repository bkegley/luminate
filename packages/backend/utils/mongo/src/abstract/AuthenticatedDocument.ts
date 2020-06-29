import {BaseDocument} from './BaseDocument'

export interface AuthenticatedDocument extends BaseDocument {
  createdByUser: string
  createdByAccount: string
  readAccess: string[]
  writeAccess: string[]
  adminAccess: string[]
  permissionType: Array<'public' | 'private'>
}
