import {IDomainEvent} from '../../DomainEvent'

export interface IGrinderDeletedEventData {
  id: string
}

export interface IGrinderDeletedEvent extends IDomainEvent<IGrinderDeletedEventData> {}
