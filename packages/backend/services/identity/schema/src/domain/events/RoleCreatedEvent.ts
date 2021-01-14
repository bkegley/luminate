import {RoleDocument} from '../../infra/models'
import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

export class RoleCreatedEvent implements IDomainEvent<RoleDocument> {
  timestamp = new Date()
  event = EventType.ROLE_CREATED_EVENT
  data: RoleDocument

  constructor(role: RoleDocument) {
    this.data = role
  }
}
