import {Token} from '@luminate/mongo-utils'
import {CreateViewInput} from '../../../types'

export class CreateViewCommand {
  name: string
  description?: string

  constructor(public user: Token, input: CreateViewInput) {
    this.name = input.name
    this.description = input.description
  }
}
