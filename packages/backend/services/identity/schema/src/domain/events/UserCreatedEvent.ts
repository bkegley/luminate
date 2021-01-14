import {EventType} from './EventType'
import {UserDocument} from '../../infra/models'
import {IDomainEvent} from './IDomainEvent'

export class UserCreatedEvent implements IDomainEvent<UserDocument> {
  timestamp = new Date()
  event = EventType.USER_CREATED_EVENT
  data: UserDocument

  constructor(data: UserDocument) {
    this.data = data
  }
}
