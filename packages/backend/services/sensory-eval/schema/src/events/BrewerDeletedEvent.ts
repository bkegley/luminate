import {IEvent} from './IEvent'
import {EventType} from './EventType'

export class BrewerDeletedEvent implements IEvent<{id: string}> {
  timestamp = new Date()
  event = EventType.BREWER_DELETED_EVENT
  data: {id: string}

  constructor(id: string) {
    this.data = {id}
  }
}
