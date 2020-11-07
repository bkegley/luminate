import {UpdateBrewingSessionInput} from '../../types'

export class UpdateBrewingSessionCommand {
  date?: string
  description?: string

  constructor(public id: string, input: UpdateBrewingSessionInput) {
    if (input.date) {
      this.date = input.date
    }

    if (input.description) {
      this.description = input.description
    }
  }
}
