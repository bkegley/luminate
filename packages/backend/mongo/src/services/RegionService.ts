import {RegionModel, RegionDocument} from '../models/Region'
import DataLoader from 'dataloader'
import {BaseService} from '../abstract/BaseService'
import {IListDocumentsArgs} from '../abstract/types'

interface Loaders {
  byRegionName?: DataLoader<string, RegionDocument | null>
  byRegionId?: DataLoader<string, RegionDocument | null>
  byCountryName?: DataLoader<string, RegionDocument[] | null>
}

export class RegionService extends BaseService<RegionDocument> {
  constructor() {
    super(RegionModel)

    this.loaders.byRegionName = new DataLoader<string, RegionDocument | null>(async names => {
      const regions = await this.model.find({name: names})
      return names.map(name => regions.find(region => region.name === name) || null)
    })

    this.loaders.byRegionId = new DataLoader<string, RegionDocument | null>(async ids => {
      const regions = await this.model.find({_id: ids})
      return ids.map(id => regions.find(region => region._id.toString() === id.toString()) || null)
    })

    this.loaders.byCountryName = new DataLoader<string, RegionDocument[] | null>(async names => {
      const regions = await this.model.find({country: names}, null, {sort: 'name'})
      return names.map(name => regions.filter(region => region.country === name))
    })
  }

  private loaders: Loaders = {}

  public async upsert(region: any) {
    return this.model.findOneAndUpdate({name: region.name}, region, {upsert: true})
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return super.getConnectionResults({...args, sortBy: {field: 'name', descending: true}})
  }

  public async getById(id: string) {
    return this.loaders.byRegionId?.load(id) || null
  }

  public async getByName(name: string) {
    return this.loaders.byRegionName?.load(name) || null
  }

  public async listByCountryName(name: string) {
    return this.loaders.byCountryName?.load(name) || []
  }

  public findRegions(conditions?: {[x: string]: any}) {
    return this.model.find(conditions)
  }
}
