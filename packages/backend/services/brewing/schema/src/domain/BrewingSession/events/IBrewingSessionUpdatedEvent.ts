import {IEvent} from '../../IEvent'

export interface IBrewingSessionUpdatedEventData {
  id: string
  date?: string
}

export interface IBrewingSessionUpdatedEvent extends IEvent<IBrewingSessionUpdatedEventData> {}
