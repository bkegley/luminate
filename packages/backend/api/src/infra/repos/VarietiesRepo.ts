import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IVarietiesRepo} from './IVarietiesRepo'
import {VarietyDocument} from '../models'
import {VarietyMapper} from '../mappers/VarietyMapper'
import {VarietyAggregate} from '../../domain/Variety/Variety'
import {BaseRepo} from '@luminate/mongo-utils'

@Injectable()
export class VarietiesRepo extends BaseRepo<VarietyDocument> implements IVarietiesRepo {
  constructor(@InjectModel('variety') protected model: Model<VarietyDocument>) {
    super(model)
  }

  public async getByName(name: string) {
    return this.model.findOne({name})
  }

  public async save(variety: VarietyAggregate) {
    const {id, ...varietyObj} = VarietyMapper.toPersistence(variety)
    await this.model.updateOne({_id: id}, varietyObj, {upsert: true})
  }
}
