import {UserDocument} from '../../models'
import {QueryListUsersArgs, UserConnection} from '../../types'

export interface IUsersAggregate {
  getConnectionResults(args: QueryListUsersArgs): Promise<UserConnection>
  getByUsername(username: string): Promise<UserDocument>
  listByAccount(accountId: string): Promise<UserDocument[]>
}
