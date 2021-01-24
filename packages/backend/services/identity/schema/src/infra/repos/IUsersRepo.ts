import {UserAggregate} from '../../domain/user/User'
import {IRepo} from './IRepo'

export interface IUsersRepo extends IRepo<UserAggregate> {
  getByUsername(username: string): Promise<UserAggregate>
}
