import {Token} from '@luminate/mongo-utils'
import {UpdateViewInput} from '../../../types'

export class UpdateViewCommand {
  name?: string
  description?: string

  constructor(public user: Token, public id: string, input: UpdateViewInput) {
    this.name = input.name
    this.description = input.description
  }
}
