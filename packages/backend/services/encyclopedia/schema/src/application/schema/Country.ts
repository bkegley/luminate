import {QueryBus} from '@nestjs/cqrs'
import {Args, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql'
import {CountryMapper} from '../../infra/mappers'
import {GetCountryQuery, ListCountriesQuery, ListRegionsQuery} from '../queries'

@Resolver('Country')
export class CountryResolvers {
  constructor(private readonly queryBus: QueryBus) {}

  @Query('listCountries')
  async listCountries() {
    const query = new ListCountriesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getCountry')
  async getCountry(@Args('id') id: string) {
    const query = new GetCountryQuery(id)
    const country = await this.queryBus.execute(query)

    return CountryMapper.toDTO(country)
  }

  @ResolveField()
  async regions(@Parent() country: any) {
    const query = new ListRegionsQuery({conditions: {country: country.id}})
    // TODO: update to not return Connection Response
    const regionsResponse = await this.queryBus.execute(query)

    return regionsResponse.edges.map((edge: any) => edge.node)
  }
}
