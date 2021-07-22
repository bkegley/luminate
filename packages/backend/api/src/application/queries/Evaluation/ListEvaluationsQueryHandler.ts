import {QueryHandler} from '@nestjs/cqrs'
import {ListEvaluationsQuery} from '.'
import {EvaluationsRepo} from '../../../infra/repos'

@QueryHandler(ListEvaluationsQuery)
export class ListEvaluationsQueryHandler {
  constructor(private readonly evaluationsRepo: EvaluationsRepo) {}
  async execute(query: ListEvaluationsQuery) {
    return this.evaluationsRepo.getConnectionResults(query.user)
  }
}
