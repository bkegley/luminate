import {UpdateCuppingSessionInput} from '../../../types'

export class UpdateCuppingSessionCommand {
  id: string
  internalId?: string
  description?: string

  constructor(id: string, input: UpdateCuppingSessionInput) {
    this.id = id
    this.internalId = input.internalId
    this.description = input.description
  }
}
