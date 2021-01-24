import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountDeletedEventData {
  id: string
}

export interface IAccountDeletedEvent extends IDomainEvent<IAccountDeletedEventData> {}
