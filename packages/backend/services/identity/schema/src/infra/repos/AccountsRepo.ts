import {IAccountsRepo} from './IAccountsRepo'
import {AccountModel} from '../models'
import {AccountMapper} from '../mappers/AccountMapper'
import {AccountAggregate} from '../../domain/account/Account'

export class AccountsRepo implements IAccountsRepo {
  public async list(conditions: any) {
    const accounts = await AccountModel.find(conditions)
    if (!accounts) {
      return null
    }

    return accounts.map(account => AccountMapper.toDomain(account))
  }

  public async getById(id: string) {
    const account = await AccountModel.findById(id)
    if (!account) {
      return null
    }

    return AccountMapper.toDomain(account)
  }

  public async getByName(name: string) {
    const account = await AccountModel.findOne({name})
    if (!account) {
      return null
    }

    return AccountMapper.toDomain(account)
  }

  public async save(account: AccountAggregate) {
    const {id, ...accountObj} = AccountMapper.toPersistence(account)
    await AccountModel.findByIdAndUpdate(id, accountObj, {upsert: true})
  }

  public async delete(id: string) {
    AccountModel.deleteOne({_id: id})
  }
}
