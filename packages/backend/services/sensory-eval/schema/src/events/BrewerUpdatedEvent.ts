import {IEvent} from './IEvent'
import {EventType} from './EventType'

interface Brewer {
  id: string
  name: string
}

export class BrewerUpdatedEvent implements IEvent<Brewer> {
  timestamp = new Date()
  event = EventType.BREWER_UPDATED_EVENT
  data: Brewer

  constructor(brewer: Brewer) {
    this.data = brewer
  }
}
