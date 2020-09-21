import {AccountDocument} from '../../models'
import {AccountConnection, QueryListAccountsArgs} from '../../types'

export interface IAccountsProjection {
  getConnectionResults(args: QueryListAccountsArgs): Promise<AccountConnection>
  // TODO: add use cases outside of filtering on id(s)
  listAccounts(args?: any): Promise<AccountDocument[]>
  getAccount(id: string): Promise<AccountDocument>
  getAccountByName(name: string): Promise<AccountDocument>
}
