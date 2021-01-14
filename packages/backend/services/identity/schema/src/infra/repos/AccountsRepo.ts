import {IAccountsRepo} from './IAccountsRepo'
import {AccountModel} from '../models'

export class AccountsRepo implements IAccountsRepo {
  public async list(conditions: any) {
    return AccountModel.find(conditions)
  }

  public async getById(id: string) {
    return AccountModel.findById(id)
  }

  public async getByName(name: string) {
    return AccountModel.findOne({name})
  }
}
