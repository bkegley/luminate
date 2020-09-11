import {IEvent} from './IEvent'
import {RoleDocument} from '../models'
import {EventType} from './EventType'

export class RoleUpdatedEvent implements IEvent<RoleDocument> {
  timestamp = new Date()
  event = EventType.ROLE_UPDATED_EVENT
  data: RoleDocument

  constructor(role: RoleDocument) {
    this.data = role
  }
}
