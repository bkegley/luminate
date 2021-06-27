import {EventType} from '../../EventType'
import {UserAggregate} from '../User'
import {IUserUpdatedEventData, IUserUpdatedEvent} from './IUserUpdatedEvent'

export class UserUpdatedEvent implements IUserUpdatedEvent {
  timestamp = new Date()
  event = EventType.USER_UPDATED_EVENT
  data: IUserUpdatedEventData

  constructor(user: UserAggregate) {
    this.data = {
      id: user.getEntityId().toString(),
      username: user.username.value,
    }
  }
}
