import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

type AccountSwitchedEventData = {username: string; accountId: string}

export class AccountSwitchedEvent implements IDomainEvent<AccountSwitchedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCHED_EVENT
  data: AccountSwitchedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
