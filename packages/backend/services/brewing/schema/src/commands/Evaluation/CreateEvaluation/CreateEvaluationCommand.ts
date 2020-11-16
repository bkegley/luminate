import {CreateEvaluationInput} from '../../../types'

export class CreateEvaluationCommand {
  date?: string

  constructor(input: CreateEvaluationInput) {
    if (input.date) {
      this.date = input.date
    }
  }
}
