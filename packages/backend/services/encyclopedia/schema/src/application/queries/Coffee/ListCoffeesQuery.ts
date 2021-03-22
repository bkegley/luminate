import {Token} from '@luminate/mongo-utils'
import {QueryInput, QueryListCoffeesArgs} from '../../../types'

export class ListCoffeesQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(public user: Token, args?: QueryListCoffeesArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
      this.query = args.query
    }
  }
}
