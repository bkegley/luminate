import {IDomainEvent} from '../../IDomainEvent'

export interface IUserLoggedInEventData {
  id: string
}

export interface IUserLoggedInEvent extends IDomainEvent<IUserLoggedInEventData> {}
