import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IBrewGuidesRepo} from './IBrewGuideRepo'
import {BrewGuideDocument} from '../../models'
import {BrewGuideMapper} from '../../mappers/BrewGuideMapper'
import {BrewGuide} from '../../../domain/BrewGuide'

@Injectable()
export class BrewGuidesRepo extends AuthenticatedRepo<BrewGuideDocument> implements IBrewGuidesRepo {
  constructor(@InjectModel('brewGuide') protected brewGuideModel: Model<BrewGuideDocument>) {
    super(brewGuideModel)
  }

  public async getByName(user: Token, name: string) {
    return this.brewGuideModel.findOne({$and: [this.getReadConditionsForUser(user), {name}]})
  }

  save(user: Token, brewGuide: BrewGuide): Promise<void>
  save(brewGuide: BrewGuide): Promise<void>
  public async save(userOrBrewGuide: Token | BrewGuide, brewGuide?: BrewGuide) {
    if (brewGuide) {
      const {id, ...brewGuideObj} = BrewGuideMapper.toPersistence(brewGuide)
      await this.updateOne(userOrBrewGuide as Token, {_id: id}, brewGuideObj)
    } else {
      const {id, ...brewGuideObj} = BrewGuideMapper.toPersistence(userOrBrewGuide as BrewGuide)
      await this.updateOne({_id: id}, brewGuideObj)
    }
  }
}
