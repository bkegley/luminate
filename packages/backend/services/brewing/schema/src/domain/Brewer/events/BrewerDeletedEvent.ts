import {EntityId} from '../../../shared'
import {EventType} from '../../EventType'
import {IEvent} from '../../IEvent'

export class BrewerDeletedEvent implements IEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.BREWER_DELETED_EVENT
  data: {id: string}

  constructor(id: EntityId | string) {
    this.data = {id: id instanceof EntityId ? id.toString() : id}
  }
}
