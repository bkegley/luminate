import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {AccountAggregate} from '../../../domain/Account/Account'
import {AccountMapper} from '../../../infra/mappers'
import {AccountsRepo} from '../../../infra/repos'
import {GetAccountQuery} from './GetAccountQuery'

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery, AccountAggregate> {
  constructor(private readonly accountsRepo: AccountsRepo) {}

  async execute(query: GetAccountQuery) {
    const accountDocument = await this.accountsRepo.getById(query.id)

    if (!accountDocument) {
      return null
    }
    return AccountMapper.toDomain(accountDocument)
  }
}
