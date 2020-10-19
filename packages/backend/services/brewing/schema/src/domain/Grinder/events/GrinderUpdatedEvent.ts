import {EventType} from '../../EventType'
import {Grinder} from '../index'
import {IGrinderUpdatedEvent} from './IGrinderUpdatedEvent'

export class GrinderUpdatedEvent implements IGrinderUpdatedEvent {
  timestamp = new Date()
  event = EventType.GRINDER_UPDATED_EVENT
  data: any

  constructor(grinder: Grinder) {
    const updatedFields = Object.fromEntries([...grinder.markedFields])
    this.data = {
      id: grinder.id.toString(),
      ...updatedFields,
    }
  }
}
