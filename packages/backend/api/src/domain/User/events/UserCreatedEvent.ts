import {EventType} from '../../EventType'
import {UserAggregate} from '../User'
import {IUserCreatedEvent, IUserCreatedEventData} from './IUserCreatedEvent'

export class UserCreatedEvent implements IUserCreatedEvent {
  timestamp = new Date()
  event = EventType.USER_CREATED_EVENT
  data: IUserCreatedEventData

  constructor(user: UserAggregate) {
    this.data = {
      id: user.getEntityId().toString(),
      username: user.username.value,
      password: user.password,
    }
  }
}
