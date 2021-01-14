import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

interface AccountUpdatedEventData {
  id: string
  name: string
}

export class AccountUpdatedEvent implements IDomainEvent<AccountUpdatedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_UPDATED_EVENT
  data: AccountUpdatedEventData

  constructor(id: string, name: string) {
    this.data = {
      id,
      name,
    }
  }
}
