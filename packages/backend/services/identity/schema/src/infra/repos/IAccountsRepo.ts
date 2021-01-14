import {IRepo} from './IRepo'

export interface IAccountsRepo extends IRepo<any> {
  getByName(name: string): Promise<any>
}
