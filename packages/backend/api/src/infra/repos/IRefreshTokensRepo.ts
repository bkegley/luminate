import {IRepo} from './IRepo'
import {RefreshTokenDocument} from '../models'

export interface IRefreshTokensRepo extends IRepo<RefreshTokenDocument> {
  getByToken(token: string): Promise<RefreshTokenDocument>
}
