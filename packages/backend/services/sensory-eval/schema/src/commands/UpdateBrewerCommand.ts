import {UpdateBrewerInput} from '../types'
import {BrewerName} from '../domain/BrewerName'
import {EntityId} from '../shared'

export class UpdateBrewerCommand {
  id: EntityId
  name: BrewerName

  constructor(id: string, input: UpdateBrewerInput) {
    this.id = EntityId.create(id)
    this.name = BrewerName.create({value: input.name})
  }
}
