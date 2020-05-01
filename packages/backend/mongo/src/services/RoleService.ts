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

  public findRoles(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }

  public async listCurrentRoles() {
    if (!this.user?.roles) return []
    return (await Promise.all(this.user.roles.map(role => this.loaders.byRoleId?.load(role.id) || null))).filter(
      Boolean,
    ) as RoleDocument[]
  }

  public listCurrentScopes() {
    return this.user?.scopes || []
  }
}
