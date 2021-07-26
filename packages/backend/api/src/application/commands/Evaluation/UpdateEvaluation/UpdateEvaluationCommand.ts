import {Token} from '@luminate/mongo-utils'
import {UpdateEvaluationInput} from '../../../../types'

export class UpdateEvaluationCommand {
  date?: string

  constructor(public user: Token, public id: string, input: UpdateEvaluationInput) {
    this.date = input.date
  }
}
