import {IBrewGuideUpdatedEvent, IBrewGuideUpdatedEventData} from './IBrewGuideUpdatedEvent'
import {EventType} from '../../EventType'
import {BrewGuide} from '..'

export class BrewGuideUpdatedEvent implements IBrewGuideUpdatedEvent {
  timestamp = new Date()
  event = EventType.BREW_GUIDE_UPDATED_EVENT
  data: IBrewGuideUpdatedEventData

  constructor(brewGuide: BrewGuide) {
    const updatedFields = Object.fromEntries([...brewGuide.markedFields])

    this.data = {
      id: brewGuide.id,
      ...updatedFields,
    }
  }
}
