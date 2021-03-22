import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetCoffeeQuery} from './GetCoffeeQuery'
import {CoffeeMapper} from '../../../infra/mappers'
import {CoffeesRepo} from '../../../infra/repos'

@QueryHandler(GetCoffeeQuery)
export class GetCoffeeQueryHandler implements IQueryHandler<GetCoffeeQuery> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(query: GetCoffeeQuery) {
    const coffee = await this.coffeesRepo.getById(query.user, query.id)
    if (!coffee) {
      return null
    }

    return CoffeeMapper.toDomain(coffee)
  }
}
