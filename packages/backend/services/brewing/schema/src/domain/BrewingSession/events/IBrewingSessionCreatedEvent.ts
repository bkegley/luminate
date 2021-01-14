import {IDomainEvent} from '../../DomainEvent'

export interface IBrewingSessionCreatedEventData {
  id: string
  date?: string
  description?: string
}

export interface IBrewingSessionCreatedEvent extends IDomainEvent<IBrewingSessionCreatedEventData> {}
