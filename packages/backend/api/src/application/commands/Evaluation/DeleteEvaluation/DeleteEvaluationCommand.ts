import {Token} from '@luminate/mongo-utils'

export class DeleteEvaluationCommand {
  constructor(public user: Token, public id: string) {}
}
