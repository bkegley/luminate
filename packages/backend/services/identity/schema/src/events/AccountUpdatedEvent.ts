import {IEvent} from './IEvent'
import {EventType} from './EventType'

interface AccountUpdatedEventData {
  id: string
  name: string
}

export class AccountUpdatedEvent implements IEvent<AccountUpdatedEventData> {
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
