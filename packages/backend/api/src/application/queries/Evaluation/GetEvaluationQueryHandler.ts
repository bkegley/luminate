import {QueryHandler} from '@nestjs/cqrs'
import {EvaluationsRepo} from '../../../infra/repos'
import {GetEvaluationQuery} from '.'

@QueryHandler(GetEvaluationQuery)
export class GetEvaluationQueryHandler {
  constructor(private readonly evaluationRepo: EvaluationsRepo) {}

  async execute(query: GetEvaluationQuery) {
    return this.evaluationRepo.getById(query.user, query.id)
  }
}
