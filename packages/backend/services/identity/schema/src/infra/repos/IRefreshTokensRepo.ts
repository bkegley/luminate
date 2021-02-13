import {RefreshTokenAggregate} from '../../domain/refreshToken/RefreshToken'
import {IRepo} from './IRepo'

export interface IRefreshTokensRepo extends IRepo<RefreshTokenAggregate> {
  getByToken(token: string): Promise<RefreshTokenAggregate>
}
