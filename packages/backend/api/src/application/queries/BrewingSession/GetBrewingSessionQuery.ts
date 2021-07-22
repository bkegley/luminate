import {Token} from '@luminate/mongo-utils'

export class GetBrewingSessionQuery {
  constructor(public user: Token, public id: string) {}
}
