import {AccountDocument} from '../../models'
import {AccountConnection, QueryListAccountsArgs} from '../../types'

export interface IAccountsAggregate {
  getConnectionResults(args: QueryListAccountsArgs): Promise<AccountConnection>
  listAccounts(): Promise<AccountDocument[]>
  getAccount(id: string): Promise<AccountDocument>
  getAccountByName(name: string): Promise<AccountDocument>
}
