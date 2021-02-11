import {EntityId} from '@luminate/services-shared'
import {UserAggregate, UserAggregateAttributes} from '../../domain/user/User'
import {UserPassword} from '../../domain/user/UserPassword'
import {UserUsername} from '../../domain/user/UserUsername'
import {User} from '../../types'

export interface IUserGraphQL extends Omit<User, 'accounts' | 'roles' | 'scopes'> {
  accounts: string[]
  roles?: string[]
  scopes?: string[]
}

export class UserMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    // @ts-ignore
    const attrs: UserAggregateAttributes = {
      username: UserUsername.create(obj.username),
      accounts: obj.accounts.map((account: string) => EntityId.create(account)),
      roles: obj.roles.map((role: any) => ({
        account: EntityId.create(role.account),
        roles: role.roles.map((role: string) => EntityId.create(role)),
      })),
    }

    if (obj.password) {
      attrs.password = UserPassword.create({value: obj.password, isHashed: true})
    }
    return UserAggregate.create(attrs, id ? EntityId.create(id) : null)
  }

  public static toPersistence(user: UserAggregate) {
    return {
      id: user.getEntityId().toString(),
      accounts: user.accounts.map(account => account.toString()),
      username: user.username.value,
      password: user.password,
      roles: user.roles.map(role => ({
        account: role.account.toString(),
        roles: role.roles.map(role => role.toString()),
      })),
    }
  }

  public static toDTO(user: UserAggregate): IUserGraphQL {
    const now = new Date()
    return {
      id: user.getEntityId().toString(),
      username: user.username.value,
      //firstName?:user.firstName.value
      //lastName?:user.lastName.value,
      accounts: user.accounts.map(account => account.toString()),
      //roles: Array<Role>
      //scopes: Array<Scalars['String']>
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
