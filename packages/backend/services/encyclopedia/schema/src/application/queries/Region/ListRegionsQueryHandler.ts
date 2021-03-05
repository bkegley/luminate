import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListRegionsQuery} from '.'
import {RegionMapper} from '../../../infra/mappers/RegionMapper'
import {RegionsRepo} from '../../../infra/repos'

@QueryHandler(ListRegionsQuery)
export class ListRegionsQueryHandler implements IQueryHandler<ListRegionsQuery> {
  constructor(private readonly regionsRepo: RegionsRepo) {}

  // TODO: update to not return Connection Response
  async execute(query: ListRegionsQuery) {
    const regions = await this.regionsRepo.list(query.conditions)

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: regions.map(region => {
        return {
          cursor: 'fakecursor',
          node: RegionMapper.toDTO(region),
        }
      }),
    }
  }
}
