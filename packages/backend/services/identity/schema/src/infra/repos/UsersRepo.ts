import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IUsersRepo} from './IUsersRepo'
import {UserDocument} from '../models'
import {UserMapper} from '../mappers/UserMapper'
import {UserAggregate} from '../../domain/user/User'

@Injectable()
export class UsersRepo implements IUsersRepo {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  public async list(conditions?: any) {
    const users = await this.userModel.find(conditions)
    if (!users) {
      return null
    }
    return users.map(user => UserMapper.toDomain(user))
  }

  public async getById(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async getByUsername(username: string) {
    const user = await this.userModel.findOne({username})
    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async save(user: UserAggregate) {
    const {id, ...userObj} = UserMapper.toPersistence(user)
    await this.userModel.updateOne(
      {_id: id},
      // @ts-ignore
      userObj,
      {upsert: true},
    )
  }

  public async delete(id: string) {
    this.userModel.deleteOne({_id: id})
  }
}
