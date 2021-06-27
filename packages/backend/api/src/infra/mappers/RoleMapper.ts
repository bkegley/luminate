import {EntityId} from '@luminate/ddd'
import mongoose from 'mongoose'
import {RoleAggregate} from '../../domain/role/Role'
import {Role} from '../../types'

export class RoleMapper {
  public static toDomain(obj: any) {
    const id = obj.id || obj._id
    return RoleAggregate.create(obj, id ? EntityId.create(id) : null)
  }

  public static toPersistence(role: RoleAggregate) {
    return {
      id: mongoose.Types.ObjectId(role.getEntityId().toString()),
      name: role.name,
      scopes: role.scopes,
    }
  }

  public static toDTO(role: RoleAggregate): Role {
    const now = new Date()
    return {
      id: role.getEntityId().toString(),
      name: role.name,
      scopes: role.scopes,
      // TODO: fix timestamps
      createdAt: now.toDateString(),
      updatedAt: now.toDateString(),
    }
  }
}
