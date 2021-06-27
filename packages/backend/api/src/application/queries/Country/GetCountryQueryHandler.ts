import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetCountryQuery} from '.'
import {CountriesRepo} from '../../../infra/repos'

@QueryHandler(GetCountryQuery)
export class GetCountryQueryHandler implements IQueryHandler<GetCountryQuery, any> {
  constructor(private readonly countriesRepo: CountriesRepo) {}

  async execute(query: GetCountryQuery) {
    return this.countriesRepo.getById(query.id)
  }
}
