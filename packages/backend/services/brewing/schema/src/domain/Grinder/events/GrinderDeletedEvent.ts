import {EventType} from '../../EventType'
import {IGrinderDeletedEvent, IGrinderDeletedEventData} from './IGrinderDeletedEvent'
import {Grinder} from '..'

export class GrinderDeletedEvent implements IGrinderDeletedEvent {
  timestamp = new Date()
  event = EventType.GRINDER_DELETED_EVENT
  data: IGrinderDeletedEventData

  constructor(grinder: Grinder) {
    this.data = {
      id: grinder.id.toString(),
    }
  }
}
