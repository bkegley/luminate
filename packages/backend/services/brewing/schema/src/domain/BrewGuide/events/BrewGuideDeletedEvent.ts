import {IBrewGuideDeletedEvent, IBrewGuideDeletedEventData} from './IBrewGuideDeletedEvent'
import {EventType} from '../../EventType'
import {BrewGuide} from '..'

export class BrewGuideDeletedEvent implements IBrewGuideDeletedEvent {
  timestamp = new Date()
  event = EventType.BREW_GUIDE_DELETED_EVENT
  data: IBrewGuideDeletedEventData

  constructor(brewGuide: BrewGuide) {
    this.data = {
      id: brewGuide.id,
    }
  }
}
