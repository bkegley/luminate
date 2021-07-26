import {Token} from '@luminate/mongo-utils'
import {CreateBrewGuideInput} from '../../../../types'

export class CreateBrewGuideCommand {
  name: string
  recipeId: string

  constructor(public user: Token, input: CreateBrewGuideInput) {
    this.name = input.name
    this.recipeId = input.recipeId
  }
}
