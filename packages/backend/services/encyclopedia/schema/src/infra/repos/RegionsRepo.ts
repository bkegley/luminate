import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRegionsRepo} from './IRegionsRepo'
import {RegionDocument} from '../models'
import {RegionMapper} from '../mappers/RegionMapper'
import {RegionAggregate} from '../../domain/Region/Region'

@Injectable()
export class RegionsRepo implements IRegionsRepo {
  constructor(@InjectModel('region') private regionModel: Model<RegionDocument>) {}

  public async list(conditions?: any) {
    const regions = await this.regionModel.find(conditions)
    if (!regions) {
      return null
    }

    return regions.map(region => RegionMapper.toDomain(region))
  }

  public async getById(id: string) {
    const region = await this.regionModel.findById(id)
    if (!region) {
      return null
    }

    return RegionMapper.toDomain(region)
  }

  public async getByName(name: string) {
    const region = await this.regionModel.findOne({name})
    if (!region) {
      return null
    }

    return RegionMapper.toDomain(region)
  }

  public async save(region: RegionAggregate) {
    const {id, ...regionObj} = RegionMapper.toPersistence(region)
    await this.regionModel.updateOne({_id: id}, regionObj, {upsert: true})
  }

  public async delete(id: string) {
    this.regionModel.deleteOne({_id: id})
  }
}
