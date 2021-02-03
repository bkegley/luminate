import {RoleAggregate} from '../../domain/role/Role'
import {Role} from '../../types'

export class RoleMapper {
  public static toDomain(obj: any) {
    return RoleAggregate.create(obj, obj.id)
  }

  public static toPersistence(role: RoleAggregate) {
    return {
      id: role.getEntityId().toString(),
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
