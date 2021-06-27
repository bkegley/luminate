import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {PostsRepo} from '../../../infra/repos'
import {GetEntityPostsQuery} from './GetEntityPostsQuery'

@QueryHandler(GetEntityPostsQuery)
export class GetEntityPostsQueryHandler implements IQueryHandler<GetEntityPostsQuery> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(query: GetEntityPostsQuery) {
    const {user, id} = query
    return this.postsRepo.listByEntityId(user, id)
  }
}
