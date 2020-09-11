import {IEvent} from './IEvent'
import {EventType} from './EventType'

export class RoleDeletedEvent implements IEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.ROLE_DELETED_EVENT
  data: {id: string}

  constructor(id: string) {
    this.data = {id}
  }
}
