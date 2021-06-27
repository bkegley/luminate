import {IDomainEvent} from '../../IDomainEvent'

export interface IUserAddedToAccountEventData {
  userId: string
  accountId: string
}

export interface IUserAddedToAccountEvent extends IDomainEvent<IUserAddedToAccountEventData> {}
