import {IEvent} from '../../IEvent'

export interface IBrewingSessionUpdatedEventData {
  id: string
  date?: string
  description?: string
}

export interface IBrewingSessionUpdatedEvent extends IEvent<IBrewingSessionUpdatedEventData> {}
