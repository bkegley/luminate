import {EventType} from '../../EventType'
import {IBrewerDeletedEvent, IBrewerDeletedEventData} from './IBrewerDeletedEvent'
import {Brewer} from '..'

export class BrewerDeletedEvent implements IBrewerDeletedEvent {
  timestamp = new Date()
  event = EventType.BREWER_DELETED_EVENT
  data: IBrewerDeletedEventData

  constructor(brewer: Brewer) {
    this.data = {
      id: brewer.id.toString(),
    }
  }
}
