import {QueryHandler} from '@nestjs/cqrs'
import {InMemoryGrinderRepository} from '../../../infra/repositories'
import {GetGrinderQuery} from '.'

@QueryHandler(GetGrinderQuery)
export class GetGrinderQueryHandler {
  constructor(private readonly evaluationRepo: InMemoryGrinderRepository) {}

  async execute(query: GetGrinderQuery) {
    return this.evaluationRepo.getById(query.id)
  }
}
