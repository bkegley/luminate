import {QueryHandler} from '@nestjs/cqrs'
import {ListGrindersQuery} from '.'
import {GrindersRepo} from '../../../infra/repos'

@QueryHandler(ListGrindersQuery)
export class ListGrindersQueryHandler {
  constructor(private readonly grindersRepo: GrindersRepo) {}
  async execute(query: ListGrindersQuery) {
    return this.grindersRepo.getConnectionResults(query.user)
  }
}
