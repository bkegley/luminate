import {Token} from '@luminate/mongo-utils'
import {CreateViewInput} from '../../../types'

export class CreateViewCommand {
  name: string
  description?: string
  jsonString?: string

  constructor(public user: Token, input: CreateViewInput) {
    this.name = input.name
    this.description = input.description
    this.jsonString = input.jsonString
  }
}
