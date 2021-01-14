import {RoleDocument} from '../../infra/models'
import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export class RoleUpdatedEvent implements IDomainEvent<RoleDocument> {
  timestamp = new Date()
  event = EventType.ROLE_UPDATED_EVENT
  data: RoleDocument

  constructor(role: RoleDocument) {
    this.data = role
  }
}
