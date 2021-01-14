import {IDomainEvent} from '../../DomainEvent'

export interface IBrewerDeletedEventData {
  id: string
}

export interface IBrewerDeletedEvent extends IDomainEvent<IBrewerDeletedEventData> {}
