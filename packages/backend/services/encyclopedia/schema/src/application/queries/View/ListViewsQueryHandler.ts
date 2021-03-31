import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListViewsQuery} from './ListViewsQuery'
import {ViewsRepo} from '../../../infra/repos'

@QueryHandler(ListViewsQuery)
export class ListViewsQueryHandler implements IQueryHandler<ListViewsQuery> {
  constructor(private readonly viewsRepo: ViewsRepo) {}

  async execute(query: ListViewsQuery) {
    const {user, ...args} = query
    return this.viewsRepo.getConnectionResults(user, args)
  }
}
