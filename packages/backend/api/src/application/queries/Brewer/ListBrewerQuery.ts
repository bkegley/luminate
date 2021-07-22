import {Token} from '@luminate/mongo-utils'
import {QueryInput, QueryListBrewersArgs} from '../../../types'

export class ListBrewersQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(public user: Token, args?: QueryListBrewersArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
    }
  }
}
