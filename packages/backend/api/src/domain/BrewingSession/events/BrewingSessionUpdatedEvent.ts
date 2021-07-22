import {IBrewingSessionDeletedEvent} from './IBrewingSessionDeletedEvent'
import {EventType} from '../../EventType'
import {IBrewingSessionUpdatedEventData} from './IBrewingSessionUpdatedEvent'
import {BrewingSession} from '..'

export class BrewingSessionUpdatedEvent implements IBrewingSessionDeletedEvent {
  timestamp = new Date()
  event = EventType.BREWING_SESSION_UPDATED_EVENT
  data: IBrewingSessionUpdatedEventData

  constructor(brewingSession: BrewingSession) {
    const updatedFields = Object.fromEntries([...brewingSession.markedFields])
    this.data = {
      id: brewingSession.id,
      brewGuideId: brewingSession.brewGuideId.toString(),
      ...updatedFields,
    }
  }
}
