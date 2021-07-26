import {Token} from '@luminate/mongo-utils'
import {UpdateBrewingSessionInput} from '../../../../types'

export class UpdateBrewingSessionCommand {
  date?: string
  description?: string
  brewGuideId: string

  constructor(public user: Token, public id: string, input: UpdateBrewingSessionInput) {
    this.brewGuideId = input.brewGuideId
    this.date = input.date
    this.description = input.description
  }
}
