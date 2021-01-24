import {AccountAggregate} from '../../domain/account/Account'
import {IRepo} from './IRepo'

export interface IAccountsRepo extends IRepo<AccountAggregate> {
  getByName(name: string): Promise<AccountAggregate>
}
