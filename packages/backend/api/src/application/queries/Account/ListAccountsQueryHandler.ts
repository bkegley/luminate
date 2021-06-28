import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {AccountsRepo} from '../../../infra/repos'
import {ListAccountsQuery} from './ListAccountsQuery'

@QueryHandler(ListAccountsQuery)
export class ListAccountsQueryHandler implements IQueryHandler<ListAccountsQuery> {
  constructor(private readonly accountsRepo: AccountsRepo) {}

  async execute(query: ListAccountsQuery) {
    return this.accountsRepo.getConnectionResults(query)
  }
}
