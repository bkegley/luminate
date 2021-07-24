import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IUsersRepo} from './IUsersRepo'
import {UserDocument} from '../../models'
import {UserMapper} from '../../mappers/UserMapper'
import {UserAggregate} from '../../../domain/user/User'

@Injectable()
export class UsersRepo extends AuthenticatedRepo<UserDocument> implements IUsersRepo {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {
    super(userModel)
  }

  public async getByUsername(username: string) {
    return this.userModel.findOne({username})
  }

  public async getByIdForRefreshToken(id: string) {
    return this.userModel.findById(id)
  }

  save(token: Token, user: UserAggregate): Promise<void>
  save(user: UserAggregate): Promise<void>
  public async save(tokenOrUser: Token | UserAggregate, user?: UserAggregate) {
    if (user) {
      const {id, ...userObj} = UserMapper.toPersistence(user)
      await this.updateOne(tokenOrUser as Token, {_id: id}, userObj)
    } else {
      const {id, ...userObj} = UserMapper.toPersistence(tokenOrUser as UserAggregate)
      await this.updateOne({_id: id}, userObj)
    }
  }
}
