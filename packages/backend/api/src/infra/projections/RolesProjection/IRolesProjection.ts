import {QueryListRolesArgs, RoleConnection} from '../../../types'
import {RoleDocument} from '../../models'

export interface IRolesProjection {
  getConnectionResults(args: QueryListRolesArgs): Promise<RoleConnection>
  // TODO: add use cases outside of filtering on id(s)
  listRoles(args?: any): Promise<RoleDocument[]>
  getRole(id: string): Promise<RoleDocument>
  getRoleByName(name: string): Promise<RoleDocument>
}
