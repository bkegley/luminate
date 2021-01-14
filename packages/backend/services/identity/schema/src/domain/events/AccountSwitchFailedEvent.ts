import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

type AccountSwitchFailedEventData = {username: string; accountId: string}

export class AccountSwitchFailedEvent implements IDomainEvent<AccountSwitchFailedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCH_FAILED_EVENT
  data: AccountSwitchFailedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
