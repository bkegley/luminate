import {Injectable, Scope} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import DataLoader from 'dataloader'
import {Model} from 'mongoose'
import {RegionAggregate} from '../../domain/Region/Region'
import {RegionMapper} from '../mappers'
import {RegionDocument} from '../models'

@Injectable({scope: Scope.REQUEST})
export class RegionLoader {
  constructor(@InjectModel('region') private readonly regionModel: Model<RegionDocument>) {}

  private byRegionId = new DataLoader<string, RegionAggregate | null>(async ids => {
    const regions = await this.regionModel.find({_id: ids})
    return ids
      .map(id => regions.find(region => region._id.toString() === id.toString()))
      .map(region => RegionMapper.toDomain(region))
  })

  private byRegionName = new DataLoader<string, RegionAggregate | null>(async names => {
    const regions = await this.regionModel.find({name: {$in: names as string[]}})
    return names.map(name => regions.find(region => region.name === name)).map(region => RegionMapper.toDomain(region))
  })

  private byCountryId = new DataLoader<string, RegionAggregate[] | null>(async ids => {
    const regions = await this.regionModel.find({country: {$in: ids as string[]}})
    return ids
      .map(id => regions.filter(region => region.country.toString() === id.toString()))
      .map(regions => regions.map(region => RegionMapper.toDomain(region)))
  })

  public getById(id: string) {
    return this.byRegionId.load(id)
  }

  public getByName(name: string) {
    return this.byRegionName.load(name)
  }

  public listByCountryId(id: string) {
    return this.byCountryId.load(id)
  }
}
