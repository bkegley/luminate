import {RoleModel, RoleDocument} from '../models/Role'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class RoleService extends AuthenticatedService<RoleDocument> {
  constructor() {
    super(RoleModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listRoles(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
