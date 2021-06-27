import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountSwitchedEventData {
  username: string
  accountId: string
}

export interface IAccountSwitchedEvent extends IDomainEvent<IAccountSwitchedEventData> {}
