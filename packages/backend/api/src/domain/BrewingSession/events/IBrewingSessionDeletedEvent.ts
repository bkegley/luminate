import {IDomainEvent} from '../../DomainEvent'

export interface IBrewingSessionDeletedEventData {
  id: string
}

export interface IBrewingSessionDeletedEvent extends IDomainEvent<IBrewingSessionDeletedEventData> {}
