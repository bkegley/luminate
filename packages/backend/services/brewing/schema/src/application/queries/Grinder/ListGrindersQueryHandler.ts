import {QueryHandler} from '@nestjs/cqrs'
import {ListGrindersQuery} from '.'
import {InMemoryGrinderRepository} from '../../../infra/repositories'

@QueryHandler(ListGrindersQuery)
export class ListGrindersQueryHandler {
  constructor(private readonly evaluationsRepo: InMemoryGrinderRepository) {}
  async execute(_query: ListGrindersQuery) {
    const grinders = await this.evaluationsRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: grinders.map(grinder => {
        return {
          cursor: 'fakecursor',
          node: grinder,
        }
      }),
    }
  }
}
