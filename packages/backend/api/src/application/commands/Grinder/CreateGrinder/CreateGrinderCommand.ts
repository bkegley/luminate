import {Token} from '@luminate/mongo-utils'
import {CreateGrinderInput} from '../../../../types'

export class CreateGrinderCommand {
  name: string
  description: string
  burrSet: string

  constructor(public user: Token, input: CreateGrinderInput) {
    this.name = input.name
    this.description = input.description
    this.burrSet = input.burrSet
  }
}
