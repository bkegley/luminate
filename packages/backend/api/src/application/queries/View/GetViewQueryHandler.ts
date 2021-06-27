import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ViewsRepo} from '../../../infra/repos'
import {GetViewQuery} from './GetViewQuery'

@QueryHandler(GetViewQuery)
export class GetViewQueryHandler implements IQueryHandler<GetViewQuery> {
  constructor(private readonly viewsRepo: ViewsRepo) {}

  async execute(query: GetViewQuery) {
    return this.viewsRepo.getById(query.user, query.id)
  }
}
