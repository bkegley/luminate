import {QueryHandler} from '@nestjs/cqrs'
import {InMemoryEvaluationRepository} from '../../../infra/repositories'
import {GetEvaluationQuery} from '.'

@QueryHandler(GetEvaluationQuery)
export class GetEvaluationQueryHandler {
  constructor(private readonly evaluationRepo: InMemoryEvaluationRepository) {}

  async execute(query: GetEvaluationQuery) {
    return this.evaluationRepo.getById(query.id)
  }
}
