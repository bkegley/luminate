import {EntityId} from '@luminate/services-shared'

export class DeleteBrewGuideCommand {
  id: EntityId

  constructor(id: string) {
    this.id = EntityId.create(id)
  }
}
