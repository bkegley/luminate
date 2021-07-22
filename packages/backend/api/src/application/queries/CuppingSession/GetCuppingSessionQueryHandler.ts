import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetCuppingSessionQuery} from '.'
import {CuppingSessionsRepo} from '../../../infra/repos'

@QueryHandler(GetCuppingSessionQuery)
export class GetCuppingSessionQueryHandler implements IQueryHandler<GetCuppingSessionQuery> {
  constructor(private readonly cuppingSessionsRepo: CuppingSessionsRepo) {}

  async execute(query: GetCuppingSessionQuery) {
    return this.cuppingSessionsRepo.getById(query.user, query.id)
  }
}
