import {IAccountSwitchFailedEvent, IAccountSwitchFailedEventData} from '.'
import {EventType} from '../../EventType'

export class AccountSwitchFailedEvent implements IAccountSwitchFailedEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_SWITCHED_EVENT
  data: IAccountSwitchFailedEventData

  constructor(username: string, accountId: string) {
    this.data = {username, accountId}
  }
}
