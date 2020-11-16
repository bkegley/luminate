import {CreateBrewingSessionInput} from '../../../types'

export class CreateBrewingSessionCommand {
  date?: string
  description?: string

  constructor(input: CreateBrewingSessionInput) {
    if (input.date) {
      this.date = input.date
    }

    if (input.description) {
      this.description = input.description
    }
  }
}
