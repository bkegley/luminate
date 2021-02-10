import mongoose from 'mongoose'
import {UserAggregate} from '../../domain/user/User'
import {User} from '../../types'

export interface IUserGraphQL extends Omit<User, 'accounts' | 'roles' | 'scopes'> {
  accounts: string[]
  roles?: string[]
  scopes?: string[]
}

export class UserMapper {
  public static toDomain(obj: any) {
    return UserAggregate.create(obj, obj.id)
  }

  public static toPersistence(user: UserAggregate) {
    return {
      id: mongoose.Types.ObjectId(user.getEntityId().toString()),
      accounts: user.accounts.map(account => mongoose.Types.ObjectId(account.toString())),
      username: user.username.value,
      password: user.password,
      roles: user.roles.map(role => mongoose.Types.ObjectId(role.toString())),
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
