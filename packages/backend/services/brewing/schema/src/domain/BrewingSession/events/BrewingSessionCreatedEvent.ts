import {IBrewingSessionCreatedEvent, IBrewingSessionCreatedEventData} from './IBrewingSessionCreatedEvent'
import {EventType} from '../../EventType'
import {BrewingSession} from '..'

export class BrewingSessionCreatedEvent implements IBrewingSessionCreatedEvent {
  timestamp = new Date()
  event = EventType.BREWING_SESSION_CREATED_EVENT
  data: IBrewingSessionCreatedEventData

  constructor(brewingSession: BrewingSession) {
    const createdFields = Object.fromEntries([...brewingSession.markedFields])
    this.data = {
      id: brewingSession.id,
      ...createdFields,
    }
  }
}
