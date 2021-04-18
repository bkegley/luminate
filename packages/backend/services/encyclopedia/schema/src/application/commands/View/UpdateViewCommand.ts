import {Token} from '@luminate/mongo-utils'
import {UpdateViewInput} from '../../../types'

export class UpdateViewCommand {
  name?: string
  description?: string
  jsonString?: string

  constructor(public user: Token, public id: string, input: UpdateViewInput) {
    this.name = input.name
    this.description = input.description
    this.jsonString = input.jsonString
  }
}
