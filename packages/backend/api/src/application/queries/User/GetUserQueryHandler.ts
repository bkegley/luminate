import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetUserQuery} from '.'
import {UsersRepo} from '../../../infra/repos'

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(query: GetUserQuery) {
    return this.usersRepo.getById(query.id)
  }
}
