import mongoose from 'mongoose'
import {Account} from '../../types'
import {AccountAggregate, AccountAggregateAttributes} from '../../domain/account/Account'
import {AccountName} from '../../domain/account/AccountName'

export class AccountMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: AccountAggregateAttributes = {
      name: AccountName.create(obj.name),
    }
    const account = AccountAggregate.create(attrs, id)
    return account
  }

  public static toPersistence(account: AccountAggregate) {
    return {
      id: mongoose.Types.ObjectId(account.getEntityId().toString()),
      name: account.name.value,
    }
  }

  public static toDTO(account: AccountAggregate): Account {
    const now = new Date()
    return {
      id: account.getEntityId().toString(),
      name: account.name.value,
      // TODO: fix users
      users: [],
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
