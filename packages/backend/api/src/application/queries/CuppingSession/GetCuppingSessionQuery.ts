import {Token} from '@luminate/mongo-utils'

export class GetCuppingSessionQuery {
  constructor(public user: Token, public id: string) {}
}
