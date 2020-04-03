import {DeviceModel, DeviceDocument} from '../models/Device'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byDeviceId?: DataLoader<string, DeviceDocument | null>
}

export class DeviceService extends AuthenticatedService<DeviceDocument> {
  constructor() {
    super(DeviceModel)

    this.loaders.byDeviceId = new DataLoader<string, DeviceDocument | null>(async ids => {
      const devices = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => devices.find(device => device._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findDevices(conditions: any) {
    return this.model.find(conditions)
  }
}
