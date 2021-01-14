import {IRepo} from './IRepo'

export interface IUsersRepo extends IRepo<any> {
  getByUsername(username: string): Promise<any>
}
