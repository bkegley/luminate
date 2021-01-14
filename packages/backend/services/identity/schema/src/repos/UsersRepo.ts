import {IUsersRepo} from './IUsersRepo'
import {UserModel} from '../models'

export class UsersRepo implements IUsersRepo {
  public async list(conditions: any) {
    return UserModel.find(conditions)
  }

  public async getById(id: string) {
    return UserModel.findById(id)
  }

  public async getByUsername(username: string) {
    return UserModel.findOne({username})
  }
}
