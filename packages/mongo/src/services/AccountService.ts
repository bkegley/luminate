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

  // TODO: should return logged in account and all other available accounts
  public listAccounts(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }

  protected getReadConditionsForUser(): any {
    const conditions = super.getReadConditionsForUser()
    conditions.$or.push({_id: this.user?.account?.id} as any)
    return conditions
  }
}
