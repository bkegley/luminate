import {UserAggregate} from '../../domain/user/User'

export class UserMapper {
  public static toDomain(obj: any) {
    return UserAggregate.create(obj, obj.id)
  }

  public static toPersistence(user: UserAggregate) {
    return {
      id: user.getEntityId().toString(),
      accounts: user.accounts.map(account => account.toString()),
      username: user.username.value,
      password: user.password,
      roles: user.roles.map(role => role.toString()),
    }
  }
}
