export interface QueryInput {
  field: string
  value?: string | null | undefined
  operator?: string | null | undefined
}

export interface IListDocumentsArgs {
  cursor?: string | null | undefined
  limit?: number | null | undefined
  query?: Array<QueryInput> | null | undefined
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
  jti: string
  sub: string
  account?: {
    id: string
    name: string
  }
  accounts?: {
    id: string
    name: string
  }[]
  roles?: {
    id: string
    name: string
  }[]
  scopes?: string[]
}

export interface Token extends TokenInput {
  iat: number
  exp: number
}
