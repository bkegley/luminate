import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {CoffeeMapper} from '../../../infra/mappers'
import {CoffeesRepo} from '../../../infra/repos'
import {ListCoffeesQuery} from './ListCoffeesQuery'

@QueryHandler(ListCoffeesQuery)
export class ListCoffeesQueryHandler implements IQueryHandler<ListCoffeesQuery> {
  constructor(private readonly coffeesRepo: CoffeesRepo) {}

  async execute(_query: ListCoffeesQuery) {
    const coffees = await this.coffeesRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: coffees.map(coffee => {
        return {
          cursor: 'fakecursor',
          node: CoffeeMapper.toDTO(coffee),
        }
      }),
    }
  }
}
