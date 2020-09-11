import {IEvent} from './IEvent'
import {EventType} from './EventType'

interface UserAddedToAccountData {
  accountId: string
  userId: string
}

export class UserAddedToAccountEvent implements IEvent<UserAddedToAccountData> {
  timestamp = new Date()
  event = EventType.USER_ADDED_TO_ACCOUNT_EVENT
  data: UserAddedToAccountData

  constructor(data: UserAddedToAccountData) {
    this.data = data
  }
}
