import {IEvent} from './IEvent'
import {EventType} from './EventType'

export interface LoginFailedEventData {
  username: string
  password: string
  reason: 'username does not exist' | 'password does not match' | 'user has no account'
}

export class LoginFailedEvent implements IEvent<LoginFailedEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: LoginFailedEventData

  constructor(data: LoginFailedEventData) {
    this.data = data
  }
}
