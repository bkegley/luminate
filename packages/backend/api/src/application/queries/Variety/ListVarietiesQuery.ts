export interface IListVarietiesQueryOptions {
  conditions?: any
  limit?: number
  cursor?: string
}

export class ListVarietiesQuery {
  public conditions?: any
  public cursor?: string
  public limit?: number

  constructor(options?: IListVarietiesQueryOptions) {
    if (options) {
      this.conditions = options.conditions
      this.cursor = options.cursor
      this.limit = options.limit
    }
  }
}
