import {EventType} from './EventType'
import {IDomainEvent} from './IDomainEvent'

interface UserAddedToAccountData {
  accountId: string
  userId: string
}

export class UserAddedToAccountEvent implements IDomainEvent<UserAddedToAccountData> {
  timestamp = new Date()
  event = EventType.USER_ADDED_TO_ACCOUNT_EVENT
  data: UserAddedToAccountData

  constructor(data: UserAddedToAccountData) {
    this.data = data
  }
}
