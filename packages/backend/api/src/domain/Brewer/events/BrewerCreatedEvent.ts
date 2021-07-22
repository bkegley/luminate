import {EventType} from '../../EventType'
import {Brewer} from '../index'
import {IBrewerCreatedEvent, IBrewerCreatedEventData} from './IBrewerCreatedEvent'

export class BrewerCreatedEvent implements IBrewerCreatedEvent {
  timestamp = new Date()
  event = EventType.BREWER_CREATED_EVENT
  data: IBrewerCreatedEventData

  constructor(brewer: Brewer) {
    const createdFields = Object.fromEntries([...brewer.markedFields])
    this.data = {
      id: brewer.id.toString(),
      name: brewer.name.value,
      ...createdFields,
    }
  }
}
