export interface IListRegionsQueryOptions {
  conditions?: any
  limit?: number
  cursor?: string
}

export class ListRegionsQuery {
  public conditions?: any
  public cursor?: string
  public limit?: number

  constructor(options?: IListRegionsQueryOptions) {
    if (options) {
      this.conditions = options.conditions
      this.cursor = options.cursor
      this.limit = options.limit
    }
  }
}
