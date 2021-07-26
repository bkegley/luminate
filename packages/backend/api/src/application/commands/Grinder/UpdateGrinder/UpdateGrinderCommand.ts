import {Token} from '@luminate/mongo-utils'
import {UpdateGrinderInput} from '../../../../types'

export class UpdateGrinderCommand {
  name: string
  description: string
  burrSet: string

  constructor(public user: Token, public id: string, input: UpdateGrinderInput) {
    this.name = input.name
    this.description = input.description
    this.burrSet = input.burrSet
  }
}
