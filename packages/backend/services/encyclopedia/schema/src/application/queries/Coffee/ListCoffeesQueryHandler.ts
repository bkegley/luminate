import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeesRepo} from '../../../infra/repos'
import {CoffeeService} from '../../../infra/services/CoffeeSerivce'
import {ListCoffeesQuery} from './ListCoffeesQuery'

@QueryHandler(ListCoffeesQuery)
export class ListCoffeesQueryHandler implements IQueryHandler<ListCoffeesQuery> {
  constructor(private readonly coffeeService: CoffeeService, private readonly coffeesRepo: CoffeesRepo) {}

  async execute(query: ListCoffeesQuery) {
    const {user, ...args} = query
    return this.coffeesRepo.getConnectionResults(user, args)
  }
}
