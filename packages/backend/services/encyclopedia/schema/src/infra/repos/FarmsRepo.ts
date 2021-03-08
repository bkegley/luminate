import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IFarmsRepo} from './IFarmsRepo'
import {FarmDocument} from '../models'
import {FarmMapper} from '../mappers/FarmMapper'
import {BaseRepo} from '@luminate/mongo-utils'
import {FarmAggregate} from '../../domain/Farm/Farm'

@Injectable()
export class FarmsRepo extends BaseRepo<FarmDocument> implements IFarmsRepo {
  constructor(@InjectModel('farm') protected model: Model<FarmDocument>) {
    super(model)
  }

  public async getByName(name: string) {
    return this.model.findOne({name})
  }

  public async save(farm: FarmAggregate) {
    const {id, ...farmObj} = FarmMapper.toPersistence(farm)
    await this.model.updateOne({_id: id}, farmObj, {upsert: true})
  }
}
