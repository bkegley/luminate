import {BrewGuide} from '../../domain/BrewGuide'

export class CreateBrewGuideDTO {
  readonly id: string
  readonly name: string

  constructor(brewGuide: BrewGuide) {
    this.id = brewGuide.id
    this.name = brewGuide.name.value
  }
}
