import {IEvent} from './IEvent'
import {EventType} from './EventType'
import {UserDocument} from '../models'

export class UserUpdatedEvent implements IEvent<UserDocument> {
  timestamp = new Date()
  event = EventType.USER_UPDATED_EVENT
  data: UserDocument

  constructor(data: UserDocument) {
    this.data = data
  }
}
