import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export interface UserRolesUpdatedEventData {
  id: string
  roles: string[]
  account: string
}

export class UserRolesUpdatedEvent implements IDomainEvent<UserRolesUpdatedEventData> {
  timestamp = new Date()
  event = EventType.USER_ROLES_UPDATED_EVENT
  data: UserRolesUpdatedEventData

  constructor(data: UserRolesUpdatedEventData) {
    this.data = data
  }
}
