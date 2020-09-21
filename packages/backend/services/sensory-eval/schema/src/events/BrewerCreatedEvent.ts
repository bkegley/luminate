import {IEvent} from './IEvent'
import {EventType} from './EventType'

interface Brewer {
  id: string
  name: string
}

export class BrewerCreatedEvent implements IEvent<Brewer> {
  timestamp = new Date()
  event = EventType.BREWER_CREATED_EVENT
  data: Brewer

  constructor(brewer: Brewer) {
    this.data = brewer
  }
}
