import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetPostQuery} from './GetPostQuery'
import {PostsRepo} from '../../../infra/repos'

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(query: GetPostQuery) {
    return this.postsRepo.getById(query.user, query.id)
  }
}
