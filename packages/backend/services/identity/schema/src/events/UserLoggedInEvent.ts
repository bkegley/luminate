import {IEvent} from './IEvent'
import {EventType} from './EventType'

export interface UserLoggedInEventData {
  id: string
}

export class UserLoggedInEvent implements IEvent<UserLoggedInEventData> {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: UserLoggedInEventData

  constructor(data: UserLoggedInEventData) {
    this.data = data
  }
}
