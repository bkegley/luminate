import {DeviceModel, DeviceDocument} from '../infra/models/Device'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byDeviceId?: DataLoader<string, DeviceDocument | null>
}

export class DeviceService extends AuthenticatedService<DeviceDocument> {
  constructor(user: Token | null) {
    super(DeviceModel, user)

    this.loaders.byDeviceId = new DataLoader<string, DeviceDocument | null>(async ids => {
      const devices = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => devices.find(device => device._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public findDevices(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }
}
