import {Token} from '@luminate/mongo-utils'

export class GetRecipeQuery {
  constructor(public user: Token, public id: string) {}
}
