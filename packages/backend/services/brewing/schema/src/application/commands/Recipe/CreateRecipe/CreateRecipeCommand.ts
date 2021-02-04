import {CreateRecipeInput} from '../../../../types'

export class CreateRecipeCommand {
  name: string
  brewerId: string
  grinderId: string
  grindSetting?: number
  note?: string

  constructor(input: CreateRecipeInput) {
    this.name = input.name
    this.brewerId = input.brewerId
    this.grinderId = input.grinderId
    if (input.note) {
      this.note = input.note
    }
    if (input.grindSetting) {
      this.grindSetting = input.grindSetting
    }
  }
}
