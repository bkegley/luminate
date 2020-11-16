import {CreateBrewGuideInput} from '../../../types'

export class CreateBrewGuideCommand {
  name: string
  recipeId: string

  constructor(input: CreateBrewGuideInput) {
    this.name = input.name
    this.recipeId = input.recipeId
  }
}
