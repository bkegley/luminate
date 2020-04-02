import {VarietyModel, VarietyDocument} from '../models/Variety'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class VarietyService extends AuthenticatedService<VarietyDocument> {
  constructor() {
    super(VarietyModel)
  }

  public findVarieties(conditions: any) {
    return this.model.find(conditions)
  }
}
