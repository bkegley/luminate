import {IRoleDeletedEvent, IRoleDeletedEventData} from './IRoleDeletedEvent'
import {EventType} from '../../EventType'

export class RoleDeletedEvent implements IRoleDeletedEvent {
  timestamp = new Date()
  event = EventType.ROLE_DELETED_EVENT
  data: IRoleDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
