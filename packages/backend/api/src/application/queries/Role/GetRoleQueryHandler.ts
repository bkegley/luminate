import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {RoleAggregate} from '../../../domain/role/Role'
import {RoleMapper} from '../../../infra/mappers'
import {RolesRepo} from '../../../infra/repos'
import {GetRoleQuery} from './GetRoleQuery'

@QueryHandler(GetRoleQuery)
export class GetRoleQueryHandler implements IQueryHandler<GetRoleQuery, RoleAggregate> {
  constructor(private readonly rolesRepo: RolesRepo) {}

  async execute(query: GetRoleQuery) {
    const roleDocument = await this.rolesRepo.getById(query.id)
    return RoleMapper.toDomain(roleDocument)
  }
}
