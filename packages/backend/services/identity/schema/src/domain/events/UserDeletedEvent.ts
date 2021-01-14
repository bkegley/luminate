import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

type UserDeletedEventData = {id: string}

export class UserDeletedEvent implements IDomainEvent<UserDeletedEventData> {
  timestamp = new Date()
  event = EventType.USER_DELETED_EVENT
  data: UserDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
