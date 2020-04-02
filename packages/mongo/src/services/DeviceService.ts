import {DeviceModel, DeviceDocument} from '../models/Device'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class DeviceService extends AuthenticatedService<DeviceDocument> {
  constructor() {
    super(DeviceModel)
  }

  public findDevices(conditions: any) {
    return this.model.find(conditions)
  }
}
