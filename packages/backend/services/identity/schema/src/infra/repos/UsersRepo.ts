import {IUsersRepo} from './IUsersRepo'
import {UserModel} from '../models'
import {UserMapper} from '../mappers/UserMapper'
import {UserAggregate} from '../../domain/user/User'

export class UsersRepo implements IUsersRepo {
  public async list(conditions: any) {
    const users = await UserModel.find(conditions)
    if (!users) {
      return null
    }
    return users.map(user => UserMapper.toDomain(user))
  }

  public async getById(id: string) {
    const user = await UserModel.findById(id)
    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async getByUsername(username: string) {
    const user = await UserModel.findOne({username})
    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async save(user: UserAggregate) {
    const {id, ...userObj} = UserMapper.toPersistence(user)
    UserModel.findByIdAndUpdate(id, userObj, {upsert: true})
  }

  public async delete(id: string) {
    UserModel.deleteOne({_id: id})
  }
}
