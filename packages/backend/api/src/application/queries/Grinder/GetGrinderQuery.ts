import {Token} from '@luminate/mongo-utils'

export class GetGrinderQuery {
  constructor(public user: Token, public id: string) {}
}
