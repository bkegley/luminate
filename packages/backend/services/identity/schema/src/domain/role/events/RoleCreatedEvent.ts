import {IRoleCreatedEvent, IRoleCreatedEventData} from './IRoleCreatedEvent'
import {EventType} from '../../EventType'
import {RoleAggregate} from '../Role'

export class RoleCreatedEvent implements IRoleCreatedEvent {
  timestamp = new Date()
  event = EventType.ROLE_CREATED_EVENT
  data: IRoleCreatedEventData

  constructor(role: RoleAggregate) {
    this.data = {
      id: role.getEntityId().toString(),
      name: role.name,
      account: role.account.value,
      scopes: role.scopes,
    }
  }
}
