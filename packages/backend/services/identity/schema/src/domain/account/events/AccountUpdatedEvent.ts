import {AccountAggregate} from '../Account'
import {EventType} from '../../EventType'
import {IAccountUpdatedEvent, IAccountUpdatedEventData} from './IAccountUpdatedEvent'

export class AccountUpdatedEvent implements IAccountUpdatedEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_UPDATED_EVENT
  data: IAccountUpdatedEventData

  constructor(account: AccountAggregate) {
    this.data = {
      id: account.getEntityId().toString(),
      name: account.name.value,
    }
  }
}
