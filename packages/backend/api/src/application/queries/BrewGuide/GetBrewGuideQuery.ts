import {Token} from '@luminate/graphql-utils'

export class GetBrewGuideQuery {
  constructor(public user: Token, public id: string) {}
}
