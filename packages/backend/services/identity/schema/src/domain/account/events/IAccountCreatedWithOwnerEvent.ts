import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountCreatedWithOwnerEventData {
  id: string
}

export interface IAccountCreatedWithOwnerEvent extends IDomainEvent<IAccountCreatedWithOwnerEventData> {}
