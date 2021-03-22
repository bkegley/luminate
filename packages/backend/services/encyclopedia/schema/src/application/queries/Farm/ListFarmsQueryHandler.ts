import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListFarmsQuery} from '.'
import {FarmsRepo} from '../../../infra/repos'

@QueryHandler(ListFarmsQuery)
export class ListFarmsQueryHandler implements IQueryHandler<ListFarmsQuery> {
  constructor(private readonly farmsRepo: FarmsRepo) {}
  async execute(query: ListFarmsQuery) {
    const {user, ...args} = query
    return this.farmsRepo.getConnectionResults(user, args)
  }
}
