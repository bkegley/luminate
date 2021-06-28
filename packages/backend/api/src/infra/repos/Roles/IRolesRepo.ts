import {IRepo} from '../IRepo'
import {RoleDocument} from '../../models'

export interface IRolesRepo extends IRepo<RoleDocument> {
  getByName(name: string): Promise<RoleDocument>
}
