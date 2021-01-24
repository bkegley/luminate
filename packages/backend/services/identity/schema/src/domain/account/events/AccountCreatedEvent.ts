import {EventType} from '../../EventType'
import {AccountAggregate} from '../Account'
import {IAccountCreatedEvent, IAccountCreatedEventData} from './IAccountCreatedEvent'

export class AccountCreatedEvent implements IAccountCreatedEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_EVENT
  data: IAccountCreatedEventData

  constructor(account: AccountAggregate) {
    this.data = {
      id: account.getEntityId().toString(),
      name: account.name.value,
    }
  }
}
