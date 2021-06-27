import {Token} from '@luminate/mongo-utils'
import {QueryInput} from '../../../types'

export interface IListViewsQueryOptions {
  limit?: number
  cursor?: string
  query?: QueryInput[]
}

export class ListViewsQuery {
  public cursor?: string
  public limit?: number
  public query?: QueryInput[]

  constructor(public user: Token, options?: IListViewsQueryOptions) {
    if (options) {
      this.cursor = options.cursor
      this.limit = options.limit
      this.query = options.query
    }
  }
}
