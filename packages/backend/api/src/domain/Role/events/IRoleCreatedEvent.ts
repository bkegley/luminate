import {IDomainEvent} from '../../IDomainEvent'
import {RoleScope} from '../RoleScope'

export interface IRoleCreatedEventData {
  id: string
  name: string
  account: string
  // TODO: fix RoleScope
  scopes: string[]
}

export interface IRoleCreatedEvent extends IDomainEvent<IRoleCreatedEventData> {}
