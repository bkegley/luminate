import {QueryInput, QueryListFarmsArgs} from '../../../types'

export class ListFarmsQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(args?: QueryListFarmsArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
      this.query = args.query
    }
  }
}
