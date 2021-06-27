import {IUserLoginFailedEvent, IUserLoginFailedEventData} from './ILoginFailedEvent'
import {UserAggregate} from '../User'
import {EventType} from '../../EventType'

export class LoginFailedEvent implements IUserLoginFailedEvent {
  timestamp = new Date()
  event = EventType.USER_LOGGED_IN_EVENT
  data: IUserLoginFailedEventData

  constructor(user: UserAggregate) {
    this.data = {
      userId: user.getEntityId().toString(),
    }
  }
}
