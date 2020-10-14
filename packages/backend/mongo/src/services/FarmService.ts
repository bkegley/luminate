import {FarmModel, FarmDocument} from '../models/Farm'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byFarmId?: DataLoader<string, FarmDocument | null>
  listByRegionId?: DataLoader<string, FarmDocument[] | null>
}

export class FarmService extends AuthenticatedService<FarmDocument> {
  constructor() {
    super(FarmModel)

    this.loaders.byFarmId = new DataLoader<string, FarmDocument | null>(async ids => {
      const farms = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => farms.find(farm => farm._id.toString() === id.toString()) || null)
    })

    this.loaders.listByRegionId = new DataLoader<string, FarmDocument[] | null>(async ids => {
      const farms = await this.model.find({region: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => farms.filter(farm => farm.region?.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public listByRegionId(regionId: string) {
    return this.loaders.listByRegionId?.load(regionId) || null
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
