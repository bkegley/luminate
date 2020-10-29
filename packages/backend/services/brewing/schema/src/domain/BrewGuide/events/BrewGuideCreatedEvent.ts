import {IBrewGuideCreatedEvent, IBrewGuideCreatedEventData} from './IBrewGuideCreatedEvent'
import {EventType} from '../../EventType'
import {BrewGuide, BrewGuideAttributes} from '..'

export class BrewGuideCreatedEvent implements IBrewGuideCreatedEvent {
  timestamp = new Date()
  event = EventType.BREW_GUIDE_CREATED_EVENT
  data: IBrewGuideCreatedEventData

  constructor(brewGuide: BrewGuide) {
    const createdFields = Object.fromEntries([...brewGuide.markedFields])
    // @ts-ignore
    this.data = {
      id: brewGuide.id,
      ...createdFields,
    }
  }
}
