import {Token} from '@luminate/mongo-utils'
import {UpdateRecipeInput} from '../../../../types'

export class UpdateRecipeCommand {
  name?: string
  brewerId?: string
  grinderId?: string
  grindSetting?: number
  note?: string

  constructor(public user: Token, public id: string, input: UpdateRecipeInput) {
    this.name = input.name
    this.brewerId = input.brewerId
    this.grinderId = input.grinderId
    this.grindSetting = input.grindSetting
    this.note = input.note
  }
}
