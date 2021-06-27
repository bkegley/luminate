import {Token} from '@luminate/graphql-utils'

export class GetCoffeeQuery {
  constructor(public user: Token, public id: string) {}
}
