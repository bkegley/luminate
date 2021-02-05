import {QueryHandler, IQueryHandler} from '@nestjs/cqrs'
import {GetBrewingSessionQuery} from './GetBrewingSessionQuery'
import {InMemoryBrewingSessionRepository} from '../../../infra/repositories'

@QueryHandler(GetBrewingSessionQuery)
export class GetBrewingSessionQueryHandler implements IQueryHandler {
  constructor(private readonly brewingSessionRepo: InMemoryBrewingSessionRepository) {}

  async execute(query: GetBrewingSessionQuery) {
    return this.brewingSessionRepo.getById(query.id)
  }
}
