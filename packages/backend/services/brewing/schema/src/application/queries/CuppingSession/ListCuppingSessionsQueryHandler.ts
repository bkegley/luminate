import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListCuppingSessionsQuery} from '.'
import {CuppingSessionMapper} from '../../../infra/mappers'
import {InMemoryCuppingSessionRepository} from '../../../infra/repositories'

@QueryHandler(ListCuppingSessionsQuery)
export class ListCuppingSessionQueryHandler implements IQueryHandler<ListCuppingSessionsQuery> {
  constructor(private readonly cuppingSessionsRepo: InMemoryCuppingSessionRepository) {}

  async execute(_query: ListCuppingSessionsQuery) {
    const cuppingSessions = await this.cuppingSessionsRepo.list()

    return {
      pageInfo: {
        hasNextPage: false,
        nextCursor: Math.random().toString(36).substring(2, 11),
        prevCursor: Math.random().toString(36).substring(2, 11),
      },
      edges: cuppingSessions.map(cuppingSession => {
        return {
          node: CuppingSessionMapper.toDTO(cuppingSession),
          cursor: Math.random().toString(36).substring(2, 11),
        }
      }),
    }
  }
}
