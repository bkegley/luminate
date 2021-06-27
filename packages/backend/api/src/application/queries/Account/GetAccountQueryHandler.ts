import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {AccountAggregate} from '../../../domain/account/Account'
import {AccountsRepo} from '../../../infra/repos'
import {GetAccountQuery} from './GetAccountQuery'

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery, AccountAggregate> {
  constructor(private readonly accountsRepo: AccountsRepo) {}

  async execute(query: GetAccountQuery) {
    const account = await this.accountsRepo.getById(query.id)
    return account
  }
}
