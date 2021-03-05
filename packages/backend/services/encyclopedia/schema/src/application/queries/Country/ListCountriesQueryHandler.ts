import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {ListCountriesQuery} from '.'
import {CountryMapper} from '../../../infra/mappers'
import {CountriesRepo} from '../../../infra/repos'

@QueryHandler(ListCountriesQuery)
export class ListCountriesQueryHandler implements IQueryHandler<ListCountriesQuery, any> {
  constructor(private readonly countriesRepo: CountriesRepo) {}

  async execute(_query: ListCountriesQuery) {
    const countries = await this.countriesRepo.list()

    return {
      pageInfo: {
        hasNextPage: true,
      },
      edges: countries.map(country => {
        return {
          cursor: 'fakecursor',
          node: CountryMapper.toDTO(country),
        }
      }),
    }
  }
}
