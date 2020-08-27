import {AccountDocument} from '../../models'
import {IListDocumentsArgs} from '@luminate/mongo-utils'
import {IConnectionResults} from '@luminate/mongo-utils/src/abstract/IConnectionResults'

export interface IAccountsAggregate {
  getConnectionResults(args: IListDocumentsArgs): Promise<IConnectionResults<AccountDocument>>
  listAccounts(): Promise<AccountDocument[]>
  getAccount(id: string): Promise<AccountDocument>
}
