import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListRolesQuery} from '.'
import {RolesRepo} from '../../../infra/repos'

@QueryHandler(ListRolesQuery)
export class ListRolesQueryHandler implements IQueryHandler<ListRolesQuery> {
  constructor(private readonly rolesRepo: RolesRepo) {}

  async execute(_query: ListRolesQuery) {
    const roles = await this.rolesRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: roles.map(role => {
        return {
          cursor: 'fakecursor',
          node: role,
        }
      }),
    }
  }
}
