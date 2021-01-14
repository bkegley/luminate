import {IRolesRepo} from './IRolesRepo'
import {RoleModel} from '../models'

export class RolesRepo implements IRolesRepo {
  public async list(conditions: any) {
    return RoleModel.find(conditions)
  }

  public async getById(id: string) {
    return RoleModel.findById(id)
  }

  public async getByName(name: string) {
    return RoleModel.findOne({name})
  }
}
