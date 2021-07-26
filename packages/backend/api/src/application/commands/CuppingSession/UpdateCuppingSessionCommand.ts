import {Token} from '@luminate/mongo-utils'
import {UpdateCuppingSessionInput} from '../../../types'

export class UpdateCuppingSessionCommand {
  internalId?: string
  description?: string

  constructor(public user: Token, public id: string, input: UpdateCuppingSessionInput) {
    this.internalId = input.internalId
    this.description = input.description
  }
}
