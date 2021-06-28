import {AuthenticatedRepo, Token} from '@luminate/mongo-utils'
import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {IRolesRepo} from './IRolesRepo'
import {RoleDocument} from '../../models'
import {RoleMapper} from '../../mappers/RoleMapper'
import {RoleAggregate} from '../../../domain/role/Role'

@Injectable()
export class RolesRepo extends AuthenticatedRepo<RoleDocument> implements IRolesRepo {
  constructor(@InjectModel('role') private roleModel: Model<RoleDocument>) {
    super(roleModel)
  }

  public async getByName(name: string) {
    return this.roleModel.findOne({name})
  }

  save(user: Token, role: RoleAggregate): Promise<void>
  save(role: RoleAggregate): Promise<void>
  public async save(userOrRole: Token | RoleAggregate, role?: RoleAggregate) {
    if (role) {
      const {id, ...roleObj} = RoleMapper.toPersistence(role)
      await this.updateOne(userOrRole as Token, {_id: id}, roleObj)
    } else {
      const {id, ...roleObj} = RoleMapper.toPersistence(userOrRole as RoleAggregate)
      await this.updateOne({_id: id}, roleObj)
    }
  }
}
