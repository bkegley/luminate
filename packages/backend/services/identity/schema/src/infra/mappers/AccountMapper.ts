import {Account} from '../../types'
import {AccountAggregate} from '../../domain/account/Account'

export class AccountMapper {
  public static toDomain(obj: any) {
    const account = AccountAggregate.create(obj, obj.id)
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
