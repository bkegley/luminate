import {QueryHandler} from '@nestjs/cqrs'
import {ListBrewersQuery} from '.'
import {InMemoryBrewerRepository} from '../../../infra/repositories'

@QueryHandler(ListBrewersQuery)
export class ListBrewersQueryHandler {
  constructor(private readonly brewersRepo: InMemoryBrewerRepository) {}
  async execute(_query: ListBrewersQuery) {
    const brewers = await this.brewersRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: brewers.map(brewer => {
        return {
          cursor: 'fakecursor',
          node: brewer,
        }
      }),
    }
  }
}
