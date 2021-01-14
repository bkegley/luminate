import {IDomainEvent} from './IDomainEvent'
import {EventType} from './EventType'
import {AccountDocument} from '../../infra/models'

export class AccountCreatedEvent implements IDomainEvent<AccountDocument> {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_EVENT
  data: AccountDocument

  constructor(account: AccountDocument) {
    this.data = account
  }
}
