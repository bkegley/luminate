import {IEvent} from './IEvent'
import {EventType} from './EventType'
import {AccountDocument, UserDocument} from '../models'

type AccountCreatedData = AccountDocument & {users?: UserDocument[]}

export class AccountCreatedWithOwnerEvent implements IEvent<AccountCreatedData> {
  timestamp = new Date()
  event = EventType.ACCOUNT_CREATED_WITH_OWNER_EVENT
  data: AccountCreatedData

  constructor(account: AccountCreatedData) {
    this.data = account
  }
}
