import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {UsersRepo} from '../../../infra/repos'
import {ListUsersQuery} from './ListUsersQuery'

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(query: ListUsersQuery) {
    return this.usersRepo.getConnectionResults(query)
  }
}
