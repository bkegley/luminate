import mongoose from 'mongoose'

export interface QueryInput {
  field: string
  value?: string
  operator?: string
}
export type TQueryInput = Array<QueryInput>

export interface IListDocumentsArgs {
  cursor?: string | null | undefined
  limit?: number | null | undefined
  query?: TQueryInput
  [x: string]: any
}

export interface ICreateConnectionResultsArgs {
  args: IListDocumentsArgs
  user: Token | null
}

export interface IConnectionResults<T> {
  pageInfo: {
    hasNextPage: boolean
    prevCursor: string
    nextCursor: string
  }
  edges: {
    cursor: string
    node: Array<T>
  }
}

interface TokenInput {
  jti: string | mongoose.Types.ObjectId
  sub: string
  account?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }
  accounts?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }[]
  roles?: {
    id: string | mongoose.Types.ObjectId
    name: string
  }[]
  scopes?: string[]
}

export interface Token extends TokenInput {
  iat: number
  exp: number
}
