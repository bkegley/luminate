import {Token} from '@luminate/mongo-utils'

export class GetEntityPostsQuery {
  constructor(public user: Token, public id: string) {}
}
