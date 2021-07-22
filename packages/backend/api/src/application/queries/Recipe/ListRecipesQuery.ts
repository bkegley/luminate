import {Token} from '@luminate/mongo-utils'

export class ListRecipesQuery {
  constructor(public user: Token) {}
}
