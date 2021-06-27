import {IUserLoggedInEvent, IUserLoggedInEventData} from './IUserLoggedInEvent'
import {EventType} from '../../EventType'
import {UserAggregate} from '../User'

export class UserLoggedInEvent implements IUserLoggedInEvent {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: IUserLoggedInEventData

  constructor(user: UserAggregate) {
    this.data = {
      id: user.getEntityId().toString(),
    }
  }
}
