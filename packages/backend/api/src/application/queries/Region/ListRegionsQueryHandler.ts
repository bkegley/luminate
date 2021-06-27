import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListRegionsQuery} from '.'
import {RegionsRepo} from '../../../infra/repos'

@QueryHandler(ListRegionsQuery)
export class ListRegionsQueryHandler implements IQueryHandler<ListRegionsQuery> {
  constructor(private readonly regionsRepo: RegionsRepo) {}

  async execute(query: ListRegionsQuery) {
    return this.regionsRepo.getConnectionResults(query)
  }
}
