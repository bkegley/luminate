import {QueryInput, QueryListCoffeesArgs} from '../../../types'

export class ListCoffeesQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(args?: QueryListCoffeesArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
      this.query = args.query
    }
  }
}
