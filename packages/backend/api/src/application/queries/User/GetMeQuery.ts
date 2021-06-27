import {Token} from '@luminate/mongo-utils'

export class GetMeQuery {
  id: string

  constructor(user: Token) {
    this.id = user.jti
  }
}
