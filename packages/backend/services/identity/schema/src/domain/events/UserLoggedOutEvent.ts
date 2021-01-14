import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

type UserLoggedOutEventData = {username: string}

export class UserLoggedOutEvent implements IDomainEvent<UserLoggedOutEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_OUT_EVENT
  data: UserLoggedOutEventData

  constructor(username: string) {
    this.data = {username}
  }
}
