import {Token} from '@luminate/mongo-utils'
import {CreateEvaluationInput} from '../../../../types'

export class CreateEvaluationCommand {
  date?: string

  constructor(public user: Token, input: CreateEvaluationInput) {
    this.date = input.date
  }
}
