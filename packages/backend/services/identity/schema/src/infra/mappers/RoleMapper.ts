import {RoleAggregate} from '../../domain/role/Role'

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
}
