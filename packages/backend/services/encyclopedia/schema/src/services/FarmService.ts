import {FarmModel, FarmDocument} from '../models/Farm'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byFarmId?: DataLoader<string, FarmDocument | null>
  listByRegionName?: DataLoader<string, FarmDocument[] | null>
}

export class FarmService extends AuthenticatedService<FarmDocument> {
  constructor(user: Token | null) {
    super(FarmModel, user)

    this.loaders.byFarmId = new DataLoader<string, FarmDocument | null>(async ids => {
      const farms = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => farms.find(farm => farm._id.toString() === id.toString()) || null)
    })

    this.loaders.listByRegionName = new DataLoader<string, FarmDocument[] | null>(async names => {
      const farms = await this.model.find({region: names, ...this.getReadConditionsForUser()})
      return names.map(name => farms.filter(farm => farm.region === name) || null)
    })
  }

  private loaders: Loaders = {}

  public listByRegionName(regionName: string) {
    return this.loaders.listByRegionName?.load(regionName) || null
  }

  public findFarms(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
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
