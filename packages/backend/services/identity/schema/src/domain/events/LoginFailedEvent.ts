import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export interface LoginFailedEventData {
  username: string
  password: string
  reason: 'username does not exist' | 'password does not match' | 'user has no account'
}

export class LoginFailedEvent implements IDomainEvent<LoginFailedEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: LoginFailedEventData

  constructor(data: LoginFailedEventData) {
    this.data = data
  }
}
