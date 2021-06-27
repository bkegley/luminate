import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IFarmsRepo} from './IFarmsRepo'
import {FarmDocument} from '../models'
import {FarmMapper} from '../mappers/FarmMapper'
import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {FarmAggregate} from '../../domain/Farm/Farm'

@Injectable()
export class FarmsRepo extends AuthenticatedRepo<FarmDocument> implements IFarmsRepo {
  constructor(@InjectModel('farm') protected model: Model<FarmDocument>) {
    super(model)
  }

  public async getByName(name: string) {
    return this.model.findOne({name})
  }

  save(user: Token, farm: FarmAggregate): Promise<void>
  save(farm: FarmAggregate): Promise<void>
  public async save(userOrFarm: Token | FarmAggregate, farm?: FarmAggregate) {
    if (farm) {
      const {_id, ...farmObj} = FarmMapper.toPersistence(farm)
      await this.updateOne(userOrFarm as Token, {_id}, farmObj)
    } else {
      const {_id, ...coffeeObj} = FarmMapper.toPersistence(userOrFarm as FarmAggregate)
      await this.updateOne({_id}, coffeeObj)
    }
  }
}
