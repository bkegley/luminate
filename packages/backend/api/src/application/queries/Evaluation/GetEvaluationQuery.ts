import {Token} from '@luminate/mongo-utils'

export class GetEvaluationQuery {
  constructor(public user: Token, public id: string) {}
}
