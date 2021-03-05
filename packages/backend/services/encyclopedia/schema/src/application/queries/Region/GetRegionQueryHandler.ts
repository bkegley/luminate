import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetRegionQuery} from '.'
import {RegionAggregate} from '../../../domain/Region/Region'
import {RegionsRepo} from '../../../infra/repos'

@QueryHandler(GetRegionQuery)
export class GetRegionQueryHandler implements IQueryHandler<GetRegionQuery, RegionAggregate> {
  constructor(private readonly regionsRepo: RegionsRepo) {}

  async execute(query: GetRegionQuery) {
    return this.regionsRepo.getById(query.id)
  }
}
