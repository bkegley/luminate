import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRegionsRepo} from './IRegionsRepo'
import {RegionDocument} from '../models'
import {RegionMapper} from '../mappers/RegionMapper'
import {RegionAggregate} from '../../domain/Region/Region'
import {BaseRepo} from '@luminate/mongo-utils'

@Injectable()
export class RegionsRepo extends BaseRepo<RegionDocument> implements IRegionsRepo {
  constructor(@InjectModel('region') protected model: Model<RegionDocument>) {
    super(model)
  }

  public async getByName(name: string) {
    const region = await this.model.findOne({name})
    if (!region) {
      return null
    }

    return RegionMapper.toDomain(region)
  }

  public async save(region: RegionAggregate) {
    const {id, ...regionObj} = RegionMapper.toPersistence(region)
    await this.model.updateOne({_id: id}, regionObj, {upsert: true})
  }
}
