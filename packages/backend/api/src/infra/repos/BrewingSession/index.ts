import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IBrewingSessionsRepo} from './IBrewingSessionRepo'
import {BrewingSessionDocument} from '../../models'
import {BrewingSessionMapper} from '../../mappers/BrewingSessionMapper'
import {BrewingSession} from '../../../domain/brewingSession'

@Injectable()
export class BrewingSessionsRepo extends AuthenticatedRepo<BrewingSessionDocument> implements IBrewingSessionsRepo {
  constructor(@InjectModel('brewingSession') protected brewingSessionModel: Model<BrewingSessionDocument>) {
    super(brewingSessionModel)
  }

  save(user: Token, brewingSession: BrewingSession): Promise<void>
  save(brewingSession: BrewingSession): Promise<void>
  public async save(userOrBrewingSession: Token | BrewingSession, brewingSession?: BrewingSession) {
    if (brewingSession) {
      const {id, ...brewingSessionObj} = BrewingSessionMapper.toPersistence(brewingSession)
      await this.updateOne(userOrBrewingSession as Token, {_id: id}, brewingSessionObj)
    } else {
      const {id, ...brewingSessionObj} = BrewingSessionMapper.toPersistence(userOrBrewingSession as BrewingSession)
      await this.updateOne({_id: id}, brewingSessionObj)
    }
  }
}
