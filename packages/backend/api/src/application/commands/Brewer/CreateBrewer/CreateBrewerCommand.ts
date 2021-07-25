import {Token} from '@luminate/mongo-utils'
import {CreateBrewerInput, BrewerType} from '../../../../types'

export class CreateBrewerCommand {
  name: string
  description: string
  type: BrewerType

  constructor(public user: Token, input: CreateBrewerInput) {
    this.name = input.name
    this.description = input.description
    this.type = input.type
  }
}
