import {IDomainEvent} from './IDomainEvent'
import {EventType} from './EventType'
import {AccountDocument, UserDocument} from '../../infra/models'

type AccountCreatedData = AccountDocument & {users?: UserDocument[]}

export class AccountCreatedWithOwnerEvent implements IDomainEvent<AccountCreatedData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_WITH_OWNER_EVENT
  data: AccountCreatedData

  constructor(account: AccountCreatedData) {
    this.data = account
  }
}
