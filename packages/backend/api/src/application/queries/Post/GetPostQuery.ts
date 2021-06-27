import {Token} from '@luminate/graphql-utils'

export class GetPostQuery {
  constructor(public user: Token, public id: string) {}
}
