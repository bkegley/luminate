import {VarietyModel, VarietyDocument} from '../models/Variety'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byVarietyId?: DataLoader<string, VarietyDocument | null>
}

export class VarietyService extends AuthenticatedService<VarietyDocument> {
  constructor() {
    super(VarietyModel)

    this.loaders.byVarietyId = new DataLoader<string, VarietyDocument | null>(async ids => {
      const varieties = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => varieties.find(variety => variety._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findVarieties(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }
}
