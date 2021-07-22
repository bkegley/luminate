import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Model} from 'mongoose'
import {IBrewersRepo} from './IBrewerRepo'
import {BrewerDocument} from '../../models'
import {BrewerMapper} from '../../mappers/BrewerMapper'
import {Brewer} from '../../../domain/brewer'

@Injectable()
export class BrewersRepo extends AuthenticatedRepo<BrewerDocument> implements IBrewersRepo {
  constructor(@InjectModel('brewer') protected brewerModel: Model<BrewerDocument>) {
    super(brewerModel)
  }

  public async getByName(name: string) {
    return this.brewerModel.findOne({name})
  }

  save(user: Token, brewer: Brewer): Promise<void>
  save(brewer: Brewer): Promise<void>
  public async save(userOrBrewer: Token | Brewer, brewer?: Brewer) {
    if (brewer) {
      const {id, ...brewerObj} = BrewerMapper.toPersistence(brewer)
      await this.updateOne(userOrBrewer as Token, {_id: id}, brewerObj)
    } else {
      const {id, ...brewerObj} = BrewerMapper.toPersistence(userOrBrewer as Brewer)
      await this.updateOne({_id: id}, brewerObj)
    }
  }
}
