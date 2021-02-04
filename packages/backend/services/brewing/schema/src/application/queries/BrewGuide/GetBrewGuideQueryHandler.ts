import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {InMemoryBrewGuideRepository} from '../../../infra/repositories'
import {GetBrewGuideQuery} from './GetBrewGuideQuery'

@QueryHandler(GetBrewGuideQuery)
export class GetBrewGuideQueryHandler implements IQueryHandler {
  constructor(private readonly brewGuideRepo: InMemoryBrewGuideRepository) {}

  async execute(query: GetBrewGuideQuery) {
    return this.brewGuideRepo.getById(query.id)
  }
}
