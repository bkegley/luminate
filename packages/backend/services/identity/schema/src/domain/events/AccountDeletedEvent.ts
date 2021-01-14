import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

type AccountDeletedEventData = {id: string}

export class AccountDeletedEvent implements IDomainEvent<AccountDeletedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_DELETED_EVENT
  data: AccountDeletedEventData

  constructor(id: string) {
    this.data = {id}
  }
}
