import {CreateBrewGuideInput} from '../../types'

export class CreateBrewGuideCommand {
  name: string

  constructor(input: CreateBrewGuideInput) {
    this.name = input.name
  }
}
