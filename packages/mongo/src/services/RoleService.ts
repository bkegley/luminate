import {RoleModel, RoleDocument} from '../models/Role'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class RoleService extends AuthenticatedService<RoleDocument> {
  constructor() {
    super(RoleModel)
  }

  public findRoles(conditions: any) {
    return this.model.find(conditions)
  }

  public listCurrentRoles() {
    return this.user?.roles
  }

  public listCurrentScopes() {
    return this.user?.scopes
  }
}
