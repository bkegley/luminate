import {Token} from '@luminate/graphql-utils'

export class GetBrewerQuery {
  constructor(public user: Token, public id: string) {}
}
