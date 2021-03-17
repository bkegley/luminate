import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRefreshTokensRepo} from './IRefreshTokensRepo'
import {RefreshTokenDocument} from '../models'
import {RefreshTokenMapper} from '../mappers/RefreshTokenMapper'
import {RefreshTokenAggregate} from '../../domain/refreshToken/RefreshToken'

@Injectable()
export class RefreshTokensRepo implements IRefreshTokensRepo {
  constructor(@InjectModel('refreshToken') private refreshTokenModel: Model<RefreshTokenDocument>) {}

  public async list(conditions?: any) {
    const tokens = await this.refreshTokenModel.find(conditions)
    if (!tokens) {
      return null
    }

    return tokens.map(account => RefreshTokenMapper.toDomain(account))
  }

  public async getById(id: string) {
    const token = await this.refreshTokenModel.findById(id)
    if (!token) {
      return null
    }

    return RefreshTokenMapper.toDomain(token)
  }

  public async getByToken(_token: string) {
    const token = await this.refreshTokenModel.findOne({token: _token})

    if (!token) {
      return null
    }

    return RefreshTokenMapper.toDomain(token)
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

  public async delete(id: string) {
    this.refreshTokenModel.deleteOne({_id: id})
  }
}
