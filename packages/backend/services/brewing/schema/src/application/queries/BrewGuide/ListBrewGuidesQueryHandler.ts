import {QueryHandler} from '@nestjs/cqrs'
import {InMemoryBrewGuideRepository} from '../../../infra/repositories'
import {ListBrewGuidesQuery} from './ListBrewGuidesQuery'

@QueryHandler(ListBrewGuidesQuery)
export class ListBrewGuidesQueryHandler {
  constructor(private readonly brewGuidesRepo: InMemoryBrewGuideRepository) {}

  async execute(query: ListBrewGuidesQuery) {
    const brewGuides = await this.brewGuidesRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: brewGuides.map(brewGuides => {
        return {
          cursor: 'fakecursor',
          node: brewGuides,
        }
      }),
    }
  }
}
