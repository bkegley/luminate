import {RegionModel, RegionDocument} from '../models/Region'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class RegionService extends AuthenticatedService<RegionDocument> {
  constructor() {
    super(RegionModel)
  }

  public findRegions(conditions: any) {
    return this.model.find(conditions)
  }
}
