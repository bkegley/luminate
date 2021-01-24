import {IDomainEvent} from '../../IDomainEvent'

export interface IUserRolesUpdatedEventData {
  id: string
  account: string
  roles: string[]
}

export interface IUserRolesUpdatedEvent extends IDomainEvent<IUserRolesUpdatedEventData> {}
