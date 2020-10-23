import {IEvent} from '../../IEvent'

export interface IBrewGuideDeletedEventData {
  id: string
}

export interface IBrewGuideDeletedEvent extends IEvent<IBrewGuideDeletedEventData> {}
