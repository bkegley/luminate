import {IDomainEvent} from '../../IDomainEvent'

export interface IUserLoginFailedEventData {
  userId: string
}

export interface IUserLoginFailedEvent extends IDomainEvent<IUserLoginFailedEventData> {}
