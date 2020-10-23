import {IEvent} from '../../IEvent'

export interface IBrewGuideCreatedEventData {
  id: string
  name: string
}

export interface IBrewGuideCreatedEvent extends IEvent<IBrewGuideCreatedEventData> {}
