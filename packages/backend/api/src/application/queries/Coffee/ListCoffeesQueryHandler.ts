import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeesRepo} from '../../../infra/repos'
import {ListCoffeesQuery} from './ListCoffeesQuery'

@QueryHandler(ListCoffeesQuery)
export class ListCoffeesQueryHandler implements IQueryHandler<ListCoffeesQuery> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(query: ListCoffeesQuery) {
    const {user, ...args} = query
    return this.coffeesRepo.getConnectionResults(user, args)
  }
}
