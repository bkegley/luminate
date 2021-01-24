import {IDomainEvent} from '../../IDomainEvent'
import {RoleScope} from '../RoleScope'

export interface IRoleCreatedEventData {
  id: string
  name: string
  account: string
  scopes: RoleScope[]
}

export interface IRoleCreatedEvent extends IDomainEvent<IRoleCreatedEventData> {}
