import {CreateCuppingSessionInput} from '../../../types'

export class CreateCuppingSessionCommand {
  public description?: string
  public internalId?: string

  constructor(input: CreateCuppingSessionInput) {
    this.description = input.description
    this.internalId = input.internalId
  }
}
