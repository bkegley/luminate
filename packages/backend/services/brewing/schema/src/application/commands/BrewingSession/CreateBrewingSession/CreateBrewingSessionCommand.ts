import {CreateBrewingSessionInput} from '../../../../types'

export class CreateBrewingSessionCommand {
  date?: string
  description?: string
  brewGuideId: string

  constructor(input: CreateBrewingSessionInput) {
    this.brewGuideId = input.brewGuideId

    if (input.date) {
      this.date = input.date
    }

    if (input.description) {
      this.description = input.description
    }
  }
}
