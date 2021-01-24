import {IAccountCreatedWithOwnerEvent, IAccountCreatedWithOwnerEventData} from './IAccountCreatedWithOwnerEvent'
import {EventType} from '../../EventType'
import {AccountAggregate} from '../Account'

// TODO: Update the data for interface for this event
export class AccountCreatedWithOwnerEvent implements IAccountCreatedWithOwnerEvent {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_WITH_OWNER_EVENT
  data: IAccountCreatedWithOwnerEventData

  constructor(account: AccountAggregate) {
    this.data = {
      id: account.getEntityId().toString(),
    }
  }
}
