import {Token} from '@luminate/mongo-utils'
import {UpdateBrewerInput} from '../../../../types'

export class UpdateBrewerCommand {
  name: string
  description: string
  type: string

  constructor(public user: Token, public id: string, input: UpdateBrewerInput) {
    this.name = input.name
    this.description = input.description
    this.type = input.type
  }
}
