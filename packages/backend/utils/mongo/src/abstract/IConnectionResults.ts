export interface IConnectionResults<T> {
  pageInfo: {
    hasNextPage: boolean
    nextCursor: string | null
    previousCursor: string | null
  }
  edges: Array<{
    node: T
    cursor: string
  }>
}
