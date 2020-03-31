import {UserModel, UserDocument} from '../models/Person'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class UserService extends AuthenticatedService<UserDocument> {
  constructor() {
    super(UserModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listUsers(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
