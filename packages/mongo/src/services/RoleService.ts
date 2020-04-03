import {RoleModel, RoleDocument} from '../models/Role'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byRoleId?: DataLoader<string, RoleDocument | null>
}

export class RoleService extends AuthenticatedService<RoleDocument> {
  constructor() {
    super(RoleModel)

    this.loaders.byRoleId = new DataLoader<string, RoleDocument | null>(async ids => {
      const roles = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => roles.find(role => role._id.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

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
