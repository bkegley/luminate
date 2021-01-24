import {IAccountSwitchedEvent, IAccountSwitchedEventData} from '.'
import {EventType} from '../../EventType'

export class AccountSwitchedEvent implements IAccountSwitchedEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCHED_EVENT
  data: IAccountSwitchedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
