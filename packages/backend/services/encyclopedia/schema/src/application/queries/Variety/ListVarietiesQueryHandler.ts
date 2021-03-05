import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListVarietiesQuery} from './ListVarietiesQuery'
import {VarietyMapper} from '../../../infra/mappers'
import {VarietiesRepo} from '../../../infra/repos'

@QueryHandler(ListVarietiesQuery)
export class ListVarietiesQueryHandler implements IQueryHandler<ListVarietiesQuery, any> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(_query: ListVarietiesQuery) {
    const varieties = await this.varietiesRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: varieties.map(variety => {
        return {
          cursor: 'fakecursor',
          node: VarietyMapper.toDTO(variety),
        }
      }),
    }
  }
}
