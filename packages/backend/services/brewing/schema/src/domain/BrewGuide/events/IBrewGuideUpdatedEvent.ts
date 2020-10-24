import {IEvent} from '../../IEvent'

export interface IBrewGuideUpdatedEventData {
  id: string
  name?: string
}

export interface IBrewGuideUpdatedEvent extends IEvent<IBrewGuideUpdatedEventData> {}
