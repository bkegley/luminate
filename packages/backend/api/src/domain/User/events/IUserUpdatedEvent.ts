import {IDomainEvent} from '../../IDomainEvent'

export interface IUserUpdatedEventData {
  id: string
  username: string
}

export interface IUserUpdatedEvent extends IDomainEvent<IUserUpdatedEventData> {}
