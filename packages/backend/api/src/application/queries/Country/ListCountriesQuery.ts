import {QueryInput, QueryListCountriesArgs} from '../../../types'

export class ListCountriesQuery {
  cursor?: string
  limit?: number
  query?: QueryInput[]

  constructor(args?: QueryListCountriesArgs) {
    if (args) {
      this.cursor = args.cursor
      this.limit = args.limit
      this.query = args.query
    }
  }
}
