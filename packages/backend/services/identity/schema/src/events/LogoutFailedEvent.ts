import {IEvent} from './IEvent'
import {EventType} from './EventType'

export interface LogoutFailedEventData {
  username: string
  reason: 'username does not exist'
}

export class LogoutFailedEvent implements IEvent<LogoutFailedEventData> {
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
