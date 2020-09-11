import {IEvent} from './IEvent'
import {EventType} from './EventType'

type UserDeletedEventData = {id: string}

export class UserDeletedEvent implements IEvent<UserDeletedEventData> {
  timestamp = new Date()
  event = EventType.USER_DELETED_EVENT
  data: UserDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
