import {IUserRolesUpdatedEvent, IUserRolesUpdatedEventData} from './IUserRolesUpdatedEvent'
import {EventType} from '../../EventType'
import {UserAggregate} from '../User'

export class UserRolesUpdatedEvent implements IUserRolesUpdatedEvent {
  timestamp = new Date()
  event = EventType.USER_ROLES_UPDATED_EVENT
  data: IUserRolesUpdatedEventData

  constructor(user: UserAggregate, account: string) {
    this.data = {
      id: user.getEntityId().toString(),
      account,
      roles: user.roles.map(role => role.toString()),
    }
  }
}
