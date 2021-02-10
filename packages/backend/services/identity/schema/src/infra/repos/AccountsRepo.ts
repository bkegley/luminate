import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IAccountsRepo} from './IAccountsRepo'
import {AccountDocument} from '../models'
import {AccountMapper} from '../mappers/AccountMapper'
import {AccountAggregate} from '../../domain/account/Account'

@Injectable()
export class AccountsRepo implements IAccountsRepo {
  constructor(@InjectModel('account') private accountModel: Model<AccountDocument>) {}

  public async list(conditions?: any) {
    const accounts = await this.accountModel.find(conditions)
    if (!accounts) {
      return null
    }

    return accounts.map(account => AccountMapper.toDomain(account))
  }

  public async getById(id: string) {
    const account = await this.accountModel.findById(id)
    if (!account) {
      return null
    }

    return AccountMapper.toDomain(account)
  }

  public async getByName(name: string) {
    const account = await this.accountModel.findOne({name})
    if (!account) {
      return null
    }

    return AccountMapper.toDomain(account)
  }

  public async save(account: AccountAggregate) {
    const {id, ...accountObj} = AccountMapper.toPersistence(account)
    await this.accountModel.updateOne({_id: id}, accountObj, {upsert: true})
  }

  public async delete(id: string) {
    this.accountModel.deleteOne({_id: id})
  }
}
