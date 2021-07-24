import {IRepo} from '../IRepo'
import {UserDocument} from '../../models'

export interface IUsersRepo extends IRepo<UserDocument> {
  getByUsername(username: string): Promise<UserDocument>
  getByIdForRefreshToken(id: string): Promise<UserDocument>
}
