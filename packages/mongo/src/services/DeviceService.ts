import {DeviceModel, DeviceDocument} from '../models/Device'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class DeviceService extends AuthenticatedService<DeviceDocument> {
  constructor() {
    super(DeviceModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listDevices(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
