import {IEvent} from './IEvent'
import {EventType} from './EventType'
import {AccountDocument} from '../models'

export class AccountCreatedEvent implements IEvent<AccountDocument> {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_EVENT
  data: AccountDocument

  constructor(account: AccountDocument) {
    this.data = account
  }
}
