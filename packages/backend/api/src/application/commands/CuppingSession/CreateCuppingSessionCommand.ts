import {Token} from '@luminate/mongo-utils'
import {CreateCuppingSessionInput} from '../../../types'

export class CreateCuppingSessionCommand {
  public description?: string
  public internalId?: string

  constructor(public user: Token, input: CreateCuppingSessionInput) {
    this.description = input.description
    this.internalId = input.internalId
  }
}
