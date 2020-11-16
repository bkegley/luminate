import {IGrinderCreatedEvent, IGrinderCreatedEventData} from './IGrinderCreatedEvent'
import {EventType} from '../../EventType'
import {Grinder} from '../index'

export class GrinderCreatedEvent implements IGrinderCreatedEvent {
  timestamp = new Date()
  event = EventType.GRINDER_CREATED_EVENT
  data: IGrinderCreatedEventData

  constructor(grinder: Grinder) {
    const createdFields = Object.fromEntries([...grinder.markedFields])
    // @ts-ignore
    this.data = {
      id: grinder.id.toString(),
      ...createdFields,
    }
  }
}
