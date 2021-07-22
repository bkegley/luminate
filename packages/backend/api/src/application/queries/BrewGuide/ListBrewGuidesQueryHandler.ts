import {QueryHandler} from '@nestjs/cqrs'
import {BrewGuidesRepo} from '../../../infra/repos'
import {ListBrewGuidesQuery} from './ListBrewGuidesQuery'

@QueryHandler(ListBrewGuidesQuery)
export class ListBrewGuidesQueryHandler {
  constructor(private readonly brewGuidesRepo: BrewGuidesRepo) {}

  async execute(query: ListBrewGuidesQuery) {
    return this.brewGuidesRepo.getConnectionResults(query.user)
  }
}
