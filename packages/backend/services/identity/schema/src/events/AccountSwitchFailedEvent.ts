import {IEvent} from './IEvent'
import {EventType} from './EventType'

type AccountSwitchFailedEventData = {username: string; accountId: string}

export class AccountSwitchFailedEvent implements IEvent<AccountSwitchFailedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCH_FAILED_EVENT
  data: AccountSwitchFailedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
