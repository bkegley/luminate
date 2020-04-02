import {FarmModel, FarmDocument} from '../models/Farm'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class FarmService extends AuthenticatedService<FarmDocument> {
  constructor() {
    super(FarmModel)
  }

  public findFarms(conditions: any) {
    return this.model.find(conditions)
  }

  public createFarmZone(farmId: string, input: any) {
    return this.updateById(farmId, {$push: {farmZones: input}})
  }

  public updateFarmZoneById(id: string, input: any) {
    return this.updateOne({'farmZones._id': id}, {$set: {'farmZones.$': {_id: id, ...input}}})
  }

  public deleteFarmZoneById(id: string) {
    return this.updateOne({'farmZones._id': id}, {$pull: {farmZones: {_id: id}}})
  }
}
