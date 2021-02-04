export interface ListQueryArgs {
  limit: number
  cursor: string
}
export abstract class ListQuery {
  limit: number
  cursor: string

  constructor(args: ListQueryArgs) {
    this.limit = args.limit
    this.cursor = args.cursor
  }
}
