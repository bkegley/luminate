import {EntityId} from '../../shared'
import {EventType, IEvent} from '.'

export class BrewerDeletedEvent implements IEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.BREWER_DELETED_EVENT
  data: {id: string}

  constructor(id: EntityId | string) {
    this.data = {id: id instanceof EntityId ? id.toString() : id}
  }
}
