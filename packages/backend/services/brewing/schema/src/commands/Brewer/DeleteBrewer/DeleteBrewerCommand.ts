import {EntityId} from '@luminate/services-shared'

export class DeleteBrewerCommand {
  id: EntityId

  constructor(id: string) {
    this.id = EntityId.create(id)
  }
}
