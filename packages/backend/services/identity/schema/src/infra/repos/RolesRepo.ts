import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRolesRepo} from './IRolesRepo'
import {RoleDocument} from '../models'
import {RoleMapper} from '../mappers/RoleMapper'
import {RoleAggregate} from '../../domain/role/Role'

@Injectable()
export class RolesRepo implements IRolesRepo {
  constructor(@InjectModel('role') private roleModel: Model<RoleDocument>) {}

  public async list(conditions?: any) {
    const roles = await this.roleModel.find(conditions)
    if (!roles) {
      return null
    }

    return roles.map(role => RoleMapper.toDomain(role))
  }

  public async getById(id: string) {
    const role = await this.roleModel.findById(id)
    if (!role) {
      return null
    }

    return RoleMapper.toDomain(role)
  }

  public async getByName(name: string) {
    const role = await this.roleModel.findOne({name})
    if (!role) {
      return null
    }

    return RoleMapper.toDomain(role)
  }

  public async save(role: RoleAggregate) {
    const {id, ...roleObj} = RoleMapper.toPersistence(role)
    await this.roleModel.findByIdAndUpdate(id, roleObj, {upsert: true})
  }

  public async delete(id: string) {
    this.roleModel.deleteOne({_id: id})
  }
}
