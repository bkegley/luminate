import {IGrinderCreatedEvent} from './IGrinderCreatedEvent'
import {EventType} from './EventType'
import {Grinder} from '../Grinder'

export class GrinderCreatedEvent implements IGrinderCreatedEvent {
  timestamp = new Date()
  event = EventType.GRINDER_CREATED_EVENT
  data: any

  constructor(grinder: Grinder) {
    const createdFields = Object.fromEntries([...grinder.markedFields])
    this.data = {
      id: grinder.id.toString(),
      ...createdFields,
    }
  }
}
