import {IEvent} from './IEvent'
import {EventType} from './EventType'

type AccountDeletedEventData = {id: string}

export class AccountDeletedEvent implements IEvent<AccountDeletedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_DELETED_EVENT
  data: AccountDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
