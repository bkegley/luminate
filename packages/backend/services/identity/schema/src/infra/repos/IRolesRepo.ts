import {RoleAggregate} from '../../domain/role/Role'
import {IRepo} from './IRepo'

export interface IRolesRepo extends IRepo<RoleAggregate> {
  getByName(name: string): Promise<RoleAggregate>
}
