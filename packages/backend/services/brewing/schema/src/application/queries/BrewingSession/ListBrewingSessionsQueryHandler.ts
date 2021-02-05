import {InMemoryBrewingSessionRepository} from '../../../infra/repositories'
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListBrewingSessionsQuery} from './ListBrewingSessionsQuery'

@QueryHandler(ListBrewingSessionsQuery)
export class ListBrewingSessionsQueryHandler implements IQueryHandler {
  constructor(private readonly brewingSessionRepo: InMemoryBrewingSessionRepository) {}

  async execute(_query: ListBrewingSessionsQuery) {
    const brewingSessions = await this.brewingSessionRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: brewingSessions.map(brewingSession => {
        return {
          cursor: 'fakecursor',
          node: brewingSession,
        }
      }),
    }
  }
}
