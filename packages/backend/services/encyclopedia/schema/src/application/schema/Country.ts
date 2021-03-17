import {QueryBus} from '@nestjs/cqrs'
import {Args, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql'
import {RegionLoader} from '../../infra/loaders'
import {CountryMapper, RegionMapper} from '../../infra/mappers'
import {QueryInput} from '../../types'
import {GetCountryQuery, ListCountriesQuery} from '../queries'

@Resolver('Country')
export class CountryResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly regionLoader: RegionLoader) {}

  @Query('listCountries')
  async listCountries(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
  ) {
    const listQuery = new ListCountriesQuery({cursor, limit, query})
    return this.queryBus.execute(listQuery)
  }

  @Query('getCountry')
  async getCountry(@Args('id') id: string) {
    const query = new GetCountryQuery(id)
    return await this.queryBus.execute(query)
  }

  @ResolveField()
  async regions(@Parent() country: any) {
    const regions = await this.regionLoader.listByCountryId(country._id)
    return regions.map(region => (region ? RegionMapper.toDTO(region) : null)).filter(Boolean)
  }
}
