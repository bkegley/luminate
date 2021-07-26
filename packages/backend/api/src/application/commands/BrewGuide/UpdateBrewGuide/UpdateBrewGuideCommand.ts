import {Token} from '@luminate/mongo-utils'
import {UpdateBrewGuideInput} from '../../../../types'

export class UpdateBrewGuideCommand {
  name?: string
  recipeId?: string

  constructor(public user: Token, public id: string, input: UpdateBrewGuideInput) {
    this.name = input.name
    this.recipeId = input.recipeId
  }
}
