import {IUserDeletedEvent, IUserDeletedEventData} from './IUserDeletedEvent'
import {EventType} from '../../EventType'

export class UserDeletedEvent implements IUserDeletedEvent {
  timestamp = new Date()
  event = EventType.USER_DELETED_EVENT
  data: IUserDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
