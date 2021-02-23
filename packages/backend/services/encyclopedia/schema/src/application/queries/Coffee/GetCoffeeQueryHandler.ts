import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeesRepo} from '../../../infra/repos'
import {GetCoffeeQuery} from './GetCoffeeQuery'

@QueryHandler(GetCoffeeQuery)
export class GetCoffeeQueryHandler implements IQueryHandler<GetCoffeeQuery> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(query: GetCoffeeQuery) {
    return this.coffeesRepo.getById(query.id)
  }
}
