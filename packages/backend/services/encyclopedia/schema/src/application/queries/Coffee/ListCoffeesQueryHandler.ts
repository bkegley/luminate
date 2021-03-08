import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeeService} from '../../../infra/services/CoffeeSerivce'
import {ListCoffeesQuery} from './ListCoffeesQuery'

@QueryHandler(ListCoffeesQuery)
export class ListCoffeesQueryHandler implements IQueryHandler<ListCoffeesQuery> {
  constructor(private readonly coffeeService: CoffeeService) {}

  async execute(query: ListCoffeesQuery) {
    return this.coffeeService.getConnectionResults({
      cursor: query.cursor,
      limit: query.limit,
      query: query.query,
    })
  }
}
