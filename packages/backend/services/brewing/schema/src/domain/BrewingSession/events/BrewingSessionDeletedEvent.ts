import {IBrewingSessionDeletedEvent, IBrewingSessionDeletedEventData} from './IBrewingSessionDeletedEvent'
import {EventType} from '../../EventType'
import {BrewingSession} from '..'

export class BrewingSessionDeletedEvent implements IBrewingSessionDeletedEvent {
  timestamp = new Date()
  event = EventType.BREWING_SESSION_DELETED_EVENT
  data: IBrewingSessionDeletedEventData

  constructor(brewingSession: BrewingSession) {
    this.data = {
      id: brewingSession.id,
    }
  }
}
