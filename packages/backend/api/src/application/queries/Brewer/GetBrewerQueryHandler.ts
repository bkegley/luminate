import {QueryHandler} from '@nestjs/cqrs'
import {BrewersRepo} from '../../../infra/repos'
import {GetBrewerQuery} from './GetBrewerQuery'

@QueryHandler(GetBrewerQuery)
export class GetBrewerQueryHandler {
  constructor(private readonly brewerRepo: BrewersRepo) {}

  async execute(query: GetBrewerQuery) {
    return this.brewerRepo.getById(query.user, query.id)
  }
}
