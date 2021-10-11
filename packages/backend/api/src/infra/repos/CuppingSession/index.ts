import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {ICuppingSessionsRepo} from './ICuppingSessionRepo'
import {CuppingSessionDocument} from '../../models'
import {CuppingSessionMapper} from '../../mappers/CuppingSessionMapper'
import {CuppingSessionAggregate} from '../../../domain/CuppingSession'

@Injectable()
export class CuppingSessionsRepo extends AuthenticatedRepo<CuppingSessionDocument> implements ICuppingSessionsRepo {
  constructor(@InjectModel('cuppingSession') protected cuppingSessionModel: Model<CuppingSessionDocument>) {
    super(cuppingSessionModel)
  }

  public async getByInternalId(user: Token, internalId: string) {
    return this.cuppingSessionModel.findOne({$and: [this.getReadConditionsForUser(user), {internalId}]})
  }

  save(user: Token, cuppingSession: CuppingSessionAggregate): Promise<void>
  save(cuppingSession: CuppingSessionAggregate): Promise<void>
  public async save(userOrCuppingSession: Token | CuppingSessionAggregate, cuppingSession?: CuppingSessionAggregate) {
    if (cuppingSession) {
      const {id, ...cuppingSessionObj} = CuppingSessionMapper.toPersistence(cuppingSession)
      await this.updateOne(userOrCuppingSession as Token, {_id: id}, cuppingSessionObj)
    } else {
      const {id, ...cuppingSessionObj} = CuppingSessionMapper.toPersistence(
        userOrCuppingSession as CuppingSessionAggregate,
      )
      await this.updateOne({_id: id}, cuppingSessionObj)
    }
  }
}
