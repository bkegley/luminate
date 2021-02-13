import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetCuppingSessionQuery} from '.'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'

@QueryHandler(GetCuppingSessionQuery)
export class GetCuppingSessionQueryHandler implements IQueryHandler<GetCuppingSessionQuery> {
  constructor(private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository) {}
  async execute(query: GetCuppingSessionQuery) {
    return this.cuppingSessionsRepo.getById(query.id)
  }
}
