import {UpdateBrewGuideInput} from '../../../types'

export class UpdateBrewGuideCommand {
  name?: string
  recipeId?: string

  constructor(public id: string, input: UpdateBrewGuideInput) {
    if (input.name) {
      this.name = input.name
    }

    if (input.recipeId) {
      this.recipeId = input.recipeId
    }
  }
}
