import {CreateRecipeInput} from '../../types'

export class CreateRecipeCommand {
  name: string
  brewerId: string
  grinderId: string
  grindSetting?: number
  instructions?: string[]

  constructor(input: CreateRecipeInput) {
    this.name = input.name
    this.brewerId = input.brewerId
    this.grinderId = input.grinderId
    if (input.instructions) {
      this.instructions = input.instructions
    }
    if (input.grindSetting) {
      this.grindSetting = input.grindSetting
    }
  }
}
