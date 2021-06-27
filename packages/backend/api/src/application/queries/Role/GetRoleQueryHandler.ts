import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {RoleAggregate} from '../../../domain/role/Role'
import {RolesRepo} from '../../../infra/repos'
import {GetRoleQuery} from './GetRoleQuery'

@QueryHandler(GetRoleQuery)
export class GetRoleQueryHandler implements IQueryHandler<GetRoleQuery, RoleAggregate> {
  constructor(private readonly rolesRepo: RolesRepo) {}

  async execute(query: GetRoleQuery) {
    return await this.rolesRepo.getById(query.id)
  }
}
