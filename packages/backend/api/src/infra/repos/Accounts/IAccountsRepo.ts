import {IRepo} from '../IRepo'
import {AccountDocument} from '../../models'

export interface IAccountsRepo extends IRepo<AccountDocument> {
  getByName(name: string): Promise<AccountDocument>
}
