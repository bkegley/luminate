import {BaseRepo} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRefreshTokensRepo} from './IRefreshTokensRepo'
import {RefreshTokenDocument} from '../models'
import {RefreshTokenMapper} from '../mappers/RefreshTokenMapper'
import {RefreshTokenAggregate} from '../../domain/refreshToken/RefreshToken'

@Injectable()
export class RefreshTokensRepo extends BaseRepo<RefreshTokenDocument> implements IRefreshTokensRepo {
  constructor(@InjectModel('refreshToken') private refreshTokenModel: Model<RefreshTokenDocument>) {
    super(refreshTokenModel)
  }

  public async getByToken(_token: string) {
    return this.refreshTokenModel.findOne({token: _token})
  }

  public async save(token: RefreshTokenAggregate) {
    const {id, ...tokenObj} = RefreshTokenMapper.toPersistence(token)
    await this.refreshTokenModel.updateOne(
      {_id: id},
      // @ts-ignore
      tokenObj,
      {upsert: true},
    )
  }
}
