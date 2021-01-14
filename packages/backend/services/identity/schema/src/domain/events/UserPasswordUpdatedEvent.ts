import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export interface UserPasswordUpdatedEventData {
  id: string
  password: string
}

export class UserPasswordUpdatedEvent implements IDomainEvent<UserPasswordUpdatedEventData> {
  timestamp = new Date()
  event = EventType.USER_PASSWORD_UPDATED_EVENT
  data: UserPasswordUpdatedEventData

  constructor(data: UserPasswordUpdatedEventData) {
    this.data = data
  }
}
