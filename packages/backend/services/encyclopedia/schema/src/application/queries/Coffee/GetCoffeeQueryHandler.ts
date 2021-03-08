import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeeService} from '../../../infra/services'
import {GetCoffeeQuery} from './GetCoffeeQuery'

@QueryHandler(GetCoffeeQuery)
export class GetCoffeeQueryHandler implements IQueryHandler<GetCoffeeQuery> {
  constructor(private readonly coffeeService: CoffeeService) {}

  async execute(query: GetCoffeeQuery) {
    return this.coffeeService.getById(query.id)
  }
}
