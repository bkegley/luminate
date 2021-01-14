import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export interface LogoutFailedEventData {
  username: string
  reason: 'username does not exist'
}

export class LogoutFailedEvent implements IDomainEvent<LogoutFailedEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: LogoutFailedEventData

  constructor(username: string) {
    this.data = {
      username,
      reason: 'username does not exist',
    }
  }
}
