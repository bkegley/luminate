import {AccountModel, AccountDocument} from '../models/Account'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class AccountService extends AuthenticatedService<AccountDocument> {
  constructor() {
    super(AccountModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listAccounts(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
