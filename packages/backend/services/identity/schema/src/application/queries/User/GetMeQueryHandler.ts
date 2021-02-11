import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {UsersRepo} from '../../../infra/repos'
import {GetMeQuery} from '.'

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(private readonly usersRepo: UsersRepo) {}

  async execute(query: GetMeQuery) {
    return this.usersRepo.getById(query.id)
  }
}
