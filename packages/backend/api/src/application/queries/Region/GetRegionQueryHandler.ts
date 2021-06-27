import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetRegionQuery} from '.'
import {RegionDocument} from '../../../infra/models'
import {RegionsRepo} from '../../../infra/repos'

@QueryHandler(GetRegionQuery)
export class GetRegionQueryHandler implements IQueryHandler<GetRegionQuery, RegionDocument> {
  constructor(private readonly regionsRepo: RegionsRepo) {}

  async execute(query: GetRegionQuery) {
    return this.regionsRepo.getById(query.id)
  }
}
