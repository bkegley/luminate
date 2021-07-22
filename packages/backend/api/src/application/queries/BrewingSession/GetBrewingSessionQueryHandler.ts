import {QueryHandler, IQueryHandler} from '@nestjs/cqrs'
import {GetBrewingSessionQuery} from './GetBrewingSessionQuery'
import {BrewingSessionsRepo} from '../../../infra/repos'

@QueryHandler(GetBrewingSessionQuery)
export class GetBrewingSessionQueryHandler implements IQueryHandler {
  constructor(private readonly brewingSessionRepo: BrewingSessionsRepo) {}

  async execute(query: GetBrewingSessionQuery) {
    return this.brewingSessionRepo.getById(query.user, query.id)
  }
}
