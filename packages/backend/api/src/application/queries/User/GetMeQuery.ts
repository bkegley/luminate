import {Token} from '@luminate/mongo-utils'

export class GetMeQuery {
  constructor(public user: Token) {}
}
