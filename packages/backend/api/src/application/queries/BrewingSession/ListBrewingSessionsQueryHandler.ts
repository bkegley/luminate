import {BrewingSessionsRepo} from '../../../infra/repos'
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListBrewingSessionsQuery} from './ListBrewingSessionsQuery'

@QueryHandler(ListBrewingSessionsQuery)
export class ListBrewingSessionsQueryHandler implements IQueryHandler {
  constructor(private readonly brewingSessionRepo: BrewingSessionsRepo) {}

  async execute(query: ListBrewingSessionsQuery) {
    return this.brewingSessionRepo.getConnectionResults(query.user)
  }
}
