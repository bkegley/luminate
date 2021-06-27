import {IDomainEvent} from '../../IDomainEvent'

export interface IUserCreatedEventData {
  id: string
  username: string
  password: string
}

export interface IUserCreatedEvent extends IDomainEvent<IUserCreatedEventData> {}
