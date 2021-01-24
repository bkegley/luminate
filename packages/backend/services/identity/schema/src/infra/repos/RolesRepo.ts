import {IRolesRepo} from './IRolesRepo'
import {RoleModel} from '../models'
import {RoleMapper} from '../mappers/RoleMapper'
import {RoleAggregate} from '../../domain/role/Role'

export class RolesRepo implements IRolesRepo {
  public async list(conditions: any) {
    const roles = await RoleModel.find(conditions)
    if (!roles) {
      return null
    }

    return roles.map(role => RoleMapper.toDomain(role))
  }

  public async getById(id: string) {
    const role = await RoleModel.findById(id)
    if (!role) {
      return null
    }

    return RoleMapper.toDomain(role)
  }

  public async getByName(name: string) {
    const role = await RoleModel.findOne({name})
    if (!role) {
      return null
    }

    return RoleMapper.toDomain(role)
  }

  public async save(role: RoleAggregate) {
    const {id, ...roleObj} = RoleMapper.toPersistence(role)
    RoleModel.findByIdAndUpdate(id, roleObj, {upsert: true})
  }

  public async delete(id: string) {
    RoleModel.deleteOne({_id: id})
  }
}
