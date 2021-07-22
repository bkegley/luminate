import {IDomainEvent} from '../../DomainEvent'

export interface IBrewGuideDeletedEventData {
  id: string
}

export interface IBrewGuideDeletedEvent extends IDomainEvent<IBrewGuideDeletedEventData> {}
