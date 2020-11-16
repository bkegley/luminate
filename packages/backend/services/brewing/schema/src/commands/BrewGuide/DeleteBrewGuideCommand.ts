import {EntityId} from '../../shared'

export class DeleteBrewGuideCommand {
  id: EntityId

  constructor(id: string) {
    this.id = EntityId.create(id)
  }
}
