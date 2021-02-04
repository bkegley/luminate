import {QueryHandler} from '@nestjs/cqrs'
import {InMemoryBrewerRepository} from '../../../infra/repositories'
import {GetBrewerQuery} from './GetBrewerQuery'

@QueryHandler(GetBrewerQuery)
export class GetBrewerQueryHandler {
  constructor(private readonly brewerRepo: InMemoryBrewerRepository) {}

  async execute(query: GetBrewerQuery) {
    return this.brewerRepo.getById(query.id)
  }
}
