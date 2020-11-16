import {EventType} from '../../EventType'
import {Grinder} from '../index'
import {IGrinderUpdatedEvent, IGrinderUpdatedEventData} from './IGrinderUpdatedEvent'

export class GrinderUpdatedEvent implements IGrinderUpdatedEvent {
  timestamp = new Date()
  event = EventType.GRINDER_UPDATED_EVENT
  data: IGrinderUpdatedEventData

  constructor(grinder: Grinder) {
    const updatedFields = Object.fromEntries([...grinder.markedFields])
    this.data = {
      id: grinder.id.toString(),
      ...updatedFields,
    }
  }
}
