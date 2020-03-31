import {VarietyModel, VarietyDocument} from '../models/Variety'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class VarietyService extends AuthenticatedService<VarietyDocument> {
  constructor() {
    super(VarietyModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listVarieties(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
