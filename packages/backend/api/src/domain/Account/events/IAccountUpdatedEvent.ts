import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountUpdatedEventData {
  id: string
  name: string
}

export interface IAccountUpdatedEvent extends IDomainEvent<IAccountUpdatedEventData> {}
