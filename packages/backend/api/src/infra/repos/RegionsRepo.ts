import {BaseRepo} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRegionsRepo} from './IRegionsRepo'
import {RegionDocument} from '../models'
import {RegionMapper} from '../mappers/RegionMapper'
import {RegionAggregate} from '../../domain/Region/Region'

@Injectable()
export class RegionsRepo extends BaseRepo<RegionDocument> implements IRegionsRepo {
  constructor(@InjectModel('region') protected model: Model<RegionDocument>) {
    super(model)
  }

  public async getByName(name: string) {
    return await this.model.findOne({name})
  }

  public async save(region: RegionAggregate) {
    const {id, ...regionObj} = RegionMapper.toPersistence(region)
    await this.model.updateOne({_id: id}, regionObj, {upsert: true})
  }
}
