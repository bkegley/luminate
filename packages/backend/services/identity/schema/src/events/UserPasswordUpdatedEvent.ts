import {IEvent} from './IEvent'
import {EventType} from './EventType'

export interface UserPasswordUpdatedEventData {
  id: string
  password: string
}

export class UserPasswordUpdatedEvent implements IEvent<UserPasswordUpdatedEventData> {
  timestamp = new Date()
  event = EventType.USER_PASSWORD_UPDATED_EVENT
  data: UserPasswordUpdatedEventData

  constructor(data: UserPasswordUpdatedEventData) {
    this.data = data
  }
}
