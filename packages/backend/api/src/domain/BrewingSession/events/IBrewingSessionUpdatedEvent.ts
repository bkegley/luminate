import {IDomainEvent} from '../../DomainEvent'

export interface IBrewingSessionUpdatedEventData {
  id: string
  date?: string
  description?: string
  brewGuideId: string
}

export interface IBrewingSessionUpdatedEvent extends IDomainEvent<IBrewingSessionUpdatedEventData> {}
