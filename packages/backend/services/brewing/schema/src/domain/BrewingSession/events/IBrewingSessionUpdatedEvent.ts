import {IEvent} from '../../IEvent'

export interface IBrewingSessionUpdatedEventData {
  id: string
  date?: string
  description?: string
  brewGuideId: string
}

export interface IBrewingSessionUpdatedEvent extends IEvent<IBrewingSessionUpdatedEventData> {}
