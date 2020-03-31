import {RegionModel, RegionDocument} from '../models/Region'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class RegionService extends AuthenticatedService<RegionDocument> {
  constructor() {
    super(RegionModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listRegions(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
