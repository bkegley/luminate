import {UpdateBrewingSessionInput} from '../../../types'

export class UpdateBrewingSessionCommand {
  date?: string
  description?: string
  brewGuideId: string

  constructor(public id: string, input: UpdateBrewingSessionInput) {
    this.brewGuideId = input.brewGuideId

    if (input.date) {
      this.date = input.date
    }

    if (input.description) {
      this.description = input.description
    }
  }
}
