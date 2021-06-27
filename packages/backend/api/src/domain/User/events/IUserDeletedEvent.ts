import {IDomainEvent} from '../../IDomainEvent'

export interface IUserDeletedEventData {
  id: string
}

export interface IUserDeletedEvent extends IDomainEvent<IUserDeletedEventData> {}
