import {QueryHandler} from '@nestjs/cqrs'
import {ListEvaluationsQuery} from '.'
import {InMemoryEvaluationRepository} from '../../../infra/repositories'

@QueryHandler(ListEvaluationsQuery)
export class ListEvaluationsQueryHandler {
  constructor(private readonly evaluationsRepo: InMemoryEvaluationRepository) {}
  async execute(_query: ListEvaluationsQuery) {
    const evaluations = await this.evaluationsRepo.list()
    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: evaluations.map(evaluation => {
        return {
          cursor: 'fakecursor',
          node: evaluation,
        }
      }),
    }
  }
}
