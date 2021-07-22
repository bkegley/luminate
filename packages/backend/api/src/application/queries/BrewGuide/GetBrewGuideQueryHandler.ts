import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {BrewGuidesRepo} from '../../../infra/repos'
import {GetBrewGuideQuery} from './GetBrewGuideQuery'

@QueryHandler(GetBrewGuideQuery)
export class GetBrewGuideQueryHandler implements IQueryHandler {
  constructor(private readonly brewGuideRepo: BrewGuidesRepo) {}

  async execute(query: GetBrewGuideQuery) {
    return this.brewGuideRepo.getById(query.user, query.id)
  }
}
