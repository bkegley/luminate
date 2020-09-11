import {IEvent} from './IEvent'
import {RoleDocument} from '../models'
import {EventType} from './EventType'

export class RoleCreatedEvent implements IEvent<RoleDocument> {
  timestamp = new Date()
  event = EventType.ROLE_CREATED_EVENT
  data: RoleDocument

  constructor(role: RoleDocument) {
    this.data = role
  }
}
