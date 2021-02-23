import {VarietyModel, VarietyDocument} from '../infra/models'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byVarietyId?: DataLoader<string, VarietyDocument | null>
}

export class VarietyService extends AuthenticatedService<VarietyDocument> {
  constructor(user: Token | null) {
    super(VarietyModel, user)

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
