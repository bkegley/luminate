import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListFarmsQuery} from '.'
import {FarmMapper} from '../../../infra/mappers'
import {FarmsRepo} from '../../../infra/repos'

@QueryHandler(ListFarmsQuery)
export class ListFarmsQueryHandler implements IQueryHandler<ListFarmsQuery> {
  constructor(private readonly farmsRepo: FarmsRepo) {}
  async execute(_query: ListFarmsQuery) {
    const farms = await this.farmsRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: farms.map(farm => {
        return {
          cursor: 'fakecursor',
          node: FarmMapper.toDTO(farm),
        }
      }),
    }
  }
}
