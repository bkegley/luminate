import {Token} from '@luminate/mongo-utils'
import {CreateRecipeInput} from '../../../../types'

export class CreateRecipeCommand {
  name: string
  brewerId: string
  grinderId: string
  grindSetting?: number
  note?: string

  constructor(public user: Token, input: CreateRecipeInput) {
    this.name = input.name
    this.brewerId = input.brewerId
    this.grinderId = input.grinderId
    this.note = input.note
    this.grindSetting = input.grindSetting
  }
}
