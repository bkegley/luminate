import {EventType} from '../../EventType'
import {UserAggregate} from '../User'
import {IUserPasswordUpdatedEvent, IUserPasswordUpdatedEventData} from './IUserPasswordUpdatedEvent'

export class UserPasswordUpdatedEvent implements IUserPasswordUpdatedEvent {
  timestamp = new Date()
  event = EventType.USER_PASSWORD_UPDATED_EVENT
  data: IUserPasswordUpdatedEventData

  constructor(user: UserAggregate) {
    this.data = {
      id: user.getEntityId().toString(),
      password: user.password,
    }
  }
}
