import {FarmModel, FarmDocument} from '../models/Farm'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class FarmService extends AuthenticatedService<FarmDocument> {
  constructor() {
    super(FarmModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listFarms(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
