import {IEvent} from './IEvent'
import {EventType} from './EventType'

export interface UserRolesUpdatedEventData {
  id: string
  roles: string[]
  account: string
}

export class UserRolesUpdatedEvent implements IEvent<UserRolesUpdatedEventData> {
  timestamp = new Date()
  event = EventType.USER_ROLES_UPDATED_EVENT
  data: UserRolesUpdatedEventData

  constructor(data: UserRolesUpdatedEventData) {
    this.data = data
  }
}
