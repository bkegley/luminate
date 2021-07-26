import {Token} from '@luminate/mongo-utils'
import {CreateBrewingSessionInput} from '../../../../types'

export class CreateBrewingSessionCommand {
  date?: string
  description?: string
  brewGuideId: string

  constructor(public user: Token, input: CreateBrewingSessionInput) {
    this.brewGuideId = input.brewGuideId
    this.date = input.date
    this.description = input.description
  }
}
