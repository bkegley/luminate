import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListVarietiesQuery} from './ListVarietiesQuery'
import {VarietiesRepo} from '../../../infra/repos'

@QueryHandler(ListVarietiesQuery)
export class ListVarietiesQueryHandler implements IQueryHandler<ListVarietiesQuery, any> {
  constructor(private readonly varietiesRepo: VarietiesRepo) {}

  async execute(query: ListVarietiesQuery) {
    return this.varietiesRepo.getConnectionResults(query)
  }
}
