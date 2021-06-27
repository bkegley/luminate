import {Token} from '@luminate/mongo-utils'

export class GetFarmQuery {
  constructor(public user: Token, public id: string) {}
}
