import {IDomainEvent} from '../../IDomainEvent'
import {RoleScope} from '../RoleScope'

export interface IRoleUpdatedEventData {
  id: string
  name: string
  account: string
  scopes: RoleScope[]
}

export interface IRoleUpdatedEvent extends IDomainEvent<IRoleUpdatedEventData> {}
