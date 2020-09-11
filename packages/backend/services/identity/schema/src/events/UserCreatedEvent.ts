import {IEvent} from './IEvent'
import {EventType} from './EventType'
import {UserDocument} from '../models'

export class UserCreatedEvent implements IEvent<UserDocument> {
  timestamp = new Date()
  event = EventType.USER_CREATED_EVENT
  data: UserDocument

  constructor(data: UserDocument) {
    this.data = data
  }
}
