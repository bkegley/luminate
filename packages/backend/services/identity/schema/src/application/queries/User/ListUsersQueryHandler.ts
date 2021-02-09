import {IQueryHandler} from '@nestjs/cqrs'
import {UsersRepo} from '../../../infra/repos'
import {ListUsersQuery} from './ListUsersQuery'

export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(_query: ListUsersQuery) {
    const users = await this.usersRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: users.map(user => {
        return {
          cursor: 'fakecursor',
          node: user,
        }
      }),
    }
  }
}
