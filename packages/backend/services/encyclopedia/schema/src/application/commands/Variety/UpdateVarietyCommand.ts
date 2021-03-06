import {UpdateVarietyInput} from '../../../types'

export class UpdateVarietyCommand {
  name?: string

  constructor(public id: string, input: UpdateVarietyInput) {
    this.name = input.name
  }
}
