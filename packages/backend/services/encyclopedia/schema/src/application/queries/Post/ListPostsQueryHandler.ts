import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {PostsRepo} from '../../../infra/repos'
import {ListPostsQuery} from './ListPostsQuery'

@QueryHandler(ListPostsQuery)
export class ListPostsQueryHandler implements IQueryHandler<ListPostsQuery> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(query: ListPostsQuery) {
    const {user, ...args} = query
    return this.postsRepo.getConnectionResults(user, args)
  }
}
