import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IAccountsRepo} from './IAccountsRepo'
import {AccountDocument} from '../../models'
import {AccountMapper} from '../../mappers/AccountMapper'
import {AccountAggregate} from '../../../domain/Account/Account'

@Injectable()
export class AccountsRepo extends AuthenticatedRepo<AccountDocument> implements IAccountsRepo {
  constructor(@InjectModel('account') private accountModel: Model<AccountDocument>) {
    super(accountModel)
  }

  public async getByName(name: string) {
    return this.accountModel.findOne({name})
  }

  save(user: Token, account: AccountAggregate): Promise<void>
  save(account: AccountAggregate): Promise<void>
  public async save(userOrAccount: Token | AccountAggregate, account?: AccountAggregate) {
    if (account) {
      const {id, ...accountObj} = AccountMapper.toPersistence(account)
      await this.updateOne(userOrAccount as Token, {_id: id}, accountObj)
    } else {
      const {id, ...coffeeObj} = AccountMapper.toPersistence(userOrAccount as AccountAggregate)
      await this.updateOne({_id: id}, coffeeObj)
    }
  }
}
