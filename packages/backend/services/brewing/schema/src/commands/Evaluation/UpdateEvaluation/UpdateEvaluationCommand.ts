import {UpdateEvaluationInput} from '../../../types'

export class UpdateEvaluationCommand {
  id: string
  date?: string

  constructor(id: string, input: UpdateEvaluationInput) {
    if (input.date) {
      this.id = id
      this.date = input.date
    }
  }
}
