import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListRolesQuery} from '.'
import {RolesRepo} from '../../../infra/repos'

@QueryHandler(ListRolesQuery)
export class ListRolesQueryHandler implements IQueryHandler<ListRolesQuery> {
  constructor(private readonly rolesRepo: RolesRepo) {}

  async execute(query: ListRolesQuery) {
    return this.rolesRepo.getConnectionResults(query)
  }
}
