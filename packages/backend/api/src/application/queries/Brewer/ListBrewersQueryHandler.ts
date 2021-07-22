import {QueryHandler} from '@nestjs/cqrs'
import {ListBrewersQuery} from '.'
import {BrewersRepo} from '../../../infra/repos'

@QueryHandler(ListBrewersQuery)
export class ListBrewersQueryHandler {
  constructor(private readonly brewersRepo: BrewersRepo) {}
  async execute(query: ListBrewersQuery) {
    const {user, ...args} = query
    return this.brewersRepo.getConnectionResults(user, args)
  }
}
