import {CreateBrewerInput, BrewerType} from '../../../types'

export class CreateBrewerCommand {
  name: string
  description: string
  type: BrewerType

  constructor(input: CreateBrewerInput) {
    this.name = input.name
    this.description = input.description
    this.type = input.type
  }
}
