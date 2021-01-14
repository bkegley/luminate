import {IRepo} from './IRepo'

export interface IRolesRepo extends IRepo<any> {
  getByName(name: string): Promise<any>
}
