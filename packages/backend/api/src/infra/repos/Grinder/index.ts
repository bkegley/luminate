import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IGrindersRepo} from './IGrinderRepo'
import {GrinderDocument} from '../../models'
import {GrinderMapper} from '../../mappers/GrinderMapper'
import {Grinder} from '../../../domain/grinder'

@Injectable()
export class GrindersRepo extends AuthenticatedRepo<GrinderDocument> implements IGrindersRepo {
  constructor(@InjectModel('grinder') protected grinderModel: Model<GrinderDocument>) {
    super(grinderModel)
  }

  public async getByName(user: Token, name: string) {
    return this.grinderModel.findOne({$and: [this.getReadConditionsForUser(user), {name}]})
  }

  save(user: Token, grinder: Grinder): Promise<void>
  save(grinder: Grinder): Promise<void>
  public async save(userOrGrinder: Token | Grinder, grinder?: Grinder) {
    if (grinder) {
      const {id, ...grinderObj} = GrinderMapper.toPersistence(grinder)
      await this.updateOne(userOrGrinder as Token, {_id: id}, grinderObj)
    } else {
      const {id, ...grinderObj} = GrinderMapper.toPersistence(userOrGrinder as Grinder)
      await this.updateOne({_id: id}, grinderObj)
    }
  }
}
