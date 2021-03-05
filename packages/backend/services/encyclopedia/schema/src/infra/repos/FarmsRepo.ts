import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IFarmsRepo} from './IFarmsRepo'
import {FarmDocument} from '../models'
import {FarmMapper} from '../mappers/FarmMapper'
import {FarmAggregate} from '../../domain/Farm/Farm'

@Injectable()
export class FarmsRepo implements IFarmsRepo {
  constructor(@InjectModel('farm') private farmModel: Model<FarmDocument>) {}

  public async list(conditions?: any) {
    const farms = await this.farmModel.find(conditions)
    if (!farms) {
      return null
    }

    return farms.map(farm => FarmMapper.toDomain(farm))
  }

  public async getById(id: string) {
    const farm = await this.farmModel.findById(id)
    if (!farm) {
      return null
    }

    return FarmMapper.toDomain(farm)
  }

  public async getByName(name: string) {
    const farm = await this.farmModel.findOne({name})
    if (!farm) {
      return null
    }

    return FarmMapper.toDomain(farm)
  }

  public async save(farm: FarmAggregate) {
    const {id, ...farmObj} = FarmMapper.toPersistence(farm)
    await this.farmModel.updateOne({_id: id}, farmObj, {upsert: true})
  }

  public async delete(id: string) {
    this.farmModel.deleteOne({_id: id})
  }
}
