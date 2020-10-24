import {IBrewGuideCreatedEvent, IBrewGuideCreatedEventData} from './IBrewGuideCreatedEvent'
import {EventType} from '../../EventType'
import {BrewGuide, BrewGuideAttributes} from '..'

type HasValue = {
  [x: string]: {
    value: any
  }
}

type MapAttributesToValues<T extends HasValue> = {
  [K in keyof T]: T[K]['value']
}

const obj = {
  hey: {
    value: 'hey',
  },
  you: {
    value: 'you',
  },
}

const mappedObj: MapAttributesToValues<typeof obj> = {
  hey: 'hey',
  you: 'youk',
}

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
