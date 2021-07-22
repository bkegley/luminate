import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListCuppingSessionsQuery} from '.'
import {CuppingSessionsRepo} from '../../../infra/repos'

@QueryHandler(ListCuppingSessionsQuery)
export class ListCuppingSessionQueryHandler implements IQueryHandler<ListCuppingSessionsQuery> {
  constructor(private readonly cuppingSessionsRepo: CuppingSessionsRepo) {}

  async execute(query: ListCuppingSessionsQuery) {
    return this.cuppingSessionsRepo.getConnectionResults(query.user)
  }
}
