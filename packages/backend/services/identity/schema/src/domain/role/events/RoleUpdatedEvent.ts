import {IRoleUpdatedEvent, IRoleUpdatedEventData} from './IRoleUpdatedEvent'
import {EventType} from '../../EventType'
import {RoleAggregate} from '../Role'

export class RoleUpdatedEvent implements IRoleUpdatedEvent {
  timestamp = new Date()
  event = EventType.ROLE_UPDATED_EVENT
  data: IRoleUpdatedEventData

  constructor(role: RoleAggregate) {
    this.data = {
      id: role.getEntityId().toString(),
      name: role.name,
      account: role.account.value,
      scopes: role.scopes,
    }
  }
}
