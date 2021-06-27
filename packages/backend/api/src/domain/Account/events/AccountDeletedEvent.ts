import {IAccountDeletedEvent, IAccountDeletedEventData} from './IAccountDeletedEvent'
import {EventType} from '../../EventType'

export class AccountDeletedEvent implements IAccountDeletedEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_DELETED_EVENT
  data: IAccountDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
