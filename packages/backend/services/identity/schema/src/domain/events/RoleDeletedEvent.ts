import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export class RoleDeletedEvent implements IDomainEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.ROLE_DELETED_EVENT
  data: {id: string}

  constructor(id: string) {
    this.data = {id}
  }
}
