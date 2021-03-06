import {CreateVarietyInput} from '../../../types'

export class CreateVarietyCommand {
  name: string

  constructor(input: CreateVarietyInput) {
    this.name = input.name
  }
}
