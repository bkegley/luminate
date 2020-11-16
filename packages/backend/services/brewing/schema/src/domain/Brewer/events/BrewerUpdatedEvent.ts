import {EventType} from '../../EventType'
import {Brewer} from '../index'
import {IBrewerUpdatedEvent, IBrewerUpdatedEventData} from './IBrewerUpdatedEvent'

export class BrewerUpdatedEvent implements IBrewerUpdatedEvent {
  timestamp = new Date()
  event = EventType.BREWER_UPDATED_EVENT
  data: IBrewerUpdatedEventData

  constructor(brewer: Brewer) {
    const updatedFields = Object.fromEntries([...brewer.markedFields])
    this.data = {
      id: brewer.id,
      ...updatedFields,
    }
  }
}
