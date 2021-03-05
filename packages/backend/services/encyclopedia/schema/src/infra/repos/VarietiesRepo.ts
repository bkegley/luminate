import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IVarietiesRepo} from './IVarietiesRepo'
import {VarietyDocument} from '../models'
import {VarietyMapper} from '../mappers/VarietyMapper'
import {VarietyAggregate} from '../../domain/Variety/Variety'

@Injectable()
export class VarietiesRepo implements IVarietiesRepo {
  constructor(@InjectModel('variety') private varietyModel: Model<VarietyDocument>) {}

  public async list(conditions?: any) {
    const varieties = await this.varietyModel.find(conditions)
    if (!varieties) {
      return null
    }

    return varieties.map(variety => VarietyMapper.toDomain(variety))
  }

  public async getById(id: string) {
    const variety = await this.varietyModel.findById(id)
    if (!variety) {
      return null
    }

    return VarietyMapper.toDomain(variety)
  }

  public async getByName(name: string) {
    const variety = await this.varietyModel.findOne({name})
    if (!variety) {
      return null
    }

    return VarietyMapper.toDomain(variety)
  }

  public async save(variety: VarietyAggregate) {
    const {id, ...varietyObj} = VarietyMapper.toPersistence(variety)
    await this.varietyModel.updateOne({_id: id}, varietyObj, {upsert: true})
  }

  public async delete(id: string) {
    this.varietyModel.deleteOne({_id: id})
  }
}
