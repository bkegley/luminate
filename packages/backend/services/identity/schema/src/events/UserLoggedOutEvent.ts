import {IEvent} from './IEvent'
import {EventType} from './EventType'

type UserLoggedOutEventData = {username: string}

export class UserLoggedOutEvent implements IEvent<UserLoggedOutEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_OUT_EVENT
  data: UserLoggedOutEventData

  constructor(username: string) {
    this.data = {username}
  }
}
