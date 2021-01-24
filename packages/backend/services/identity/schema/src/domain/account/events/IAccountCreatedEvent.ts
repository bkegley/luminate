import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountCreatedEventData {
  id: string
  name: string
}

export interface IAccountCreatedEvent extends IDomainEvent<IAccountCreatedEventData> {}
