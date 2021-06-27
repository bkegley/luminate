import {IDomainEvent} from '../../IDomainEvent'

export interface IUserPasswordUpdatedEventData {
  id: string
  password: string
}

export interface IUserPasswordUpdatedEvent extends IDomainEvent<IUserPasswordUpdatedEventData> {}
