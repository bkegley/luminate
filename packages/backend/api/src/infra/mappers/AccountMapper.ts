import {Account} from '../../types'
import {AccountAggregate, AccountAggregateAttributes} from '../../domain/account/Account'
import {AccountName} from '../../domain/account/AccountName'
import {EntityId} from '@luminate/ddd'

export class AccountMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    let attrs: AccountAggregateAttributes = {
      name: AccountName.create(obj.name),
    }
    const account = AccountAggregate.create(attrs, id ? EntityId.create(id) : null)
    return account
  }

  public static toPersistence(account: AccountAggregate) {
    return {
      id: account.getEntityId().toString(),
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
