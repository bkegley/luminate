import {IUserAddedToAccountEvent, IUserAddedToAccountEventData} from './IUserAddedToAccountEvent'
import {EventType} from '../../EventType'

export class UserAddedToAccountEvent implements IUserAddedToAccountEvent {
  timestamp = new Date()
  event = EventType.USER_ADDED_TO_ACCOUNT_EVENT
  data: IUserAddedToAccountEventData

  constructor(data: IUserAddedToAccountEventData) {
    this.data = data
  }
}
