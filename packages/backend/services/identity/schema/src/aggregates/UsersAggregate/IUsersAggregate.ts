import {IConnectionResults, IListDocumentsArgs} from '@luminate/mongo-utils'
import {UserDocument} from '../../models'

export interface IUsersAggregate {
  getConnectionResults(args: IListDocumentsArgs): Promise<IConnectionResults<UserDocument>>
}
