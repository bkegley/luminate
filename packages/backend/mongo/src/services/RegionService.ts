import {RegionModel, RegionDocument} from '../models/Region'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byRegionId?: DataLoader<string, RegionDocument | null>
  byCountryId?: DataLoader<string, RegionDocument[] | null>
}

export class RegionService extends AuthenticatedService<RegionDocument> {
  constructor() {
    super(RegionModel)

    this.loaders.byRegionId = new DataLoader<string, RegionDocument | null>(async ids => {
      const regions = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => regions.find(region => region._id.toString() === id.toString()) || null)
    })

    this.loaders.byCountryId = new DataLoader<string, RegionDocument[] | null>(async ids => {
      const regions = await this.model.find({country: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => regions.filter(region => region.country?.toString() === id.toString()))
    })
  }

  private loaders: Loaders = {}

  public async getById(id: string) {
    return this.loaders.byRegionId?.load(id) || null
  }

  public async listByCountryId(id: string) {
    return this.loaders.byCountryId?.load(id) || []
  }

  public findRegions(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }
}
