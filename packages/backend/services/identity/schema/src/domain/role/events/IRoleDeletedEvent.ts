import {IDomainEvent} from '../../IDomainEvent'

export interface IRoleDeletedEventData {
  id: string
}

export interface IRoleDeletedEvent extends IDomainEvent<IRoleDeletedEventData> {}
