import {Token} from '@luminate/mongo-utils'

export class GetViewQuery {
  constructor(public user: Token, public id: string) {}
}
