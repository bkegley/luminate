import {RegionModel, RegionDocument} from '../models/Region'
import DataLoader from 'dataloader'
import {BaseService, IListDocumentsArgs} from '@luminate/mongo-utils'

interface Loaders {
  byRegionName?: DataLoader<string, RegionDocument | null>
  byRegionId?: DataLoader<string, RegionDocument | null>
  byCountryId?: DataLoader<string, RegionDocument[] | null>
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

    this.loaders.byCountryId = new DataLoader<string, RegionDocument[] | null>(async ids => {
      const regions = await this.model.find({country: ids}, null, {sort: 'name'})
      return ids.map(id => regions.filter(region => region.country?.toString() === id.toString()))
    })
  }

  private loaders: Loaders = {}

  public async upsert(region: any) {
    return this.model.findOneAndUpdate({name: region.name}, region, {upsert: true, new: true})
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

  public async listByCountryId(id: string) {
    return this.loaders.byCountryId?.load(id) || []
  }

  public findRegions(conditions?: {[x: string]: any}) {
    return this.model.find(conditions)
  }
}
