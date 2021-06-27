import {IDomainEvent} from '../../IDomainEvent'

export interface IAccountSwitchFailedEventData {
  username: string
  accountId: string
}

export interface IAccountSwitchFailedEvent extends IDomainEvent<IAccountSwitchFailedEventData> {}
