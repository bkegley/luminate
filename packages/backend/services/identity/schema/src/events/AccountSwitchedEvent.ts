import {IEvent} from './IEvent'
import {EventType} from './EventType'

type AccountSwitchedEventData = {username: string; accountId: string}

export class AccountSwitchedEvent implements IEvent<AccountSwitchedEventData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCHED_EVENT
  data: AccountSwitchedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
