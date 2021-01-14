import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export interface UserLoggedInEventData {
  id: string
}

export class UserLoggedInEvent implements IDomainEvent<UserLoggedInEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: UserLoggedInEventData

  constructor(data: UserLoggedInEventData) {
    this.data = data
  }
}
