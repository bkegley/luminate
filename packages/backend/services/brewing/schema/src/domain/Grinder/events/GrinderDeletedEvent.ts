import {EntityId} from '../../../shared'
import {EventType} from '../../EventType'
import {IEvent} from '../../IEvent'

export class GrinderDeletedEvent implements IEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.GRINDER_DELETED_EVENT
  data: {id: string}

  constructor(id: EntityId | string) {
    this.data = {id: id instanceof EntityId ? id.toString() : id}
  }
}
