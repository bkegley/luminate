import {IDomainEvent} from '../../IDomainEvent'
import {RoleScope} from '../RoleScope'

export interface IRoleUpdatedEventData {
  id: string
  name: string
  account: string
  // TODO: fix RoleScope
  scopes: string[]
}

export interface IRoleUpdatedEvent extends IDomainEvent<IRoleUpdatedEventData> {}
