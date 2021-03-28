import {Token} from '@luminate/mongo-utils'
import {QueryInput, QueryListPostsArgs} from '../../../types'

export class ListPostsQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(public user: Token, args?: QueryListPostsArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
      this.query = args.query
    }
  }
}
