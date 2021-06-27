import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListCountriesQuery} from '.'
import {CountriesRepo} from '../../../infra/repos'

@QueryHandler(ListCountriesQuery)
export class ListCountriesQueryHandler implements IQueryHandler<ListCountriesQuery, any> {
  constructor(private readonly countriesRepo: CountriesRepo) {}

  async execute(query: ListCountriesQuery) {
    return this.countriesRepo.getConnectionResults(query)
  }
}
