import {QueryHandler} from '@nestjs/cqrs'
import {GrindersRepo} from '../../../infra/repos'
import {GetGrinderQuery} from '.'

@QueryHandler(GetGrinderQuery)
export class GetGrinderQueryHandler {
  constructor(private readonly evaluationRepo: GrindersRepo) {}

  async execute(query: GetGrinderQuery) {
    return this.evaluationRepo.getById(query.user, query.id)
  }
}
