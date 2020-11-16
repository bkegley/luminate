import {IEvent} from '../../IEvent'

export interface IBrewingSessionCreatedEventData {
  id: string
  date?: string
  description?: string
}

export interface IBrewingSessionCreatedEvent extends IEvent<IBrewingSessionCreatedEventData> {}
