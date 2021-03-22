import {Authenticated} from '@luminate/graphql-utils'
import {UseGuards} from '@nestjs/common'
import {QueryBus} from '@nestjs/cqrs'
import {Args, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql'
import {RegionLoader} from '../../infra/loaders'
import {RegionMapper} from '../../infra/mappers'
import {QueryInput} from '../../types'
import {AuthGuard} from '../AuthGuard'
import {GetCountryQuery, ListCountriesQuery} from '../queries'

@Resolver('Country')
@UseGuards(AuthGuard)
export class CountryResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly regionLoader: RegionLoader) {}

  @Query('listCountries')
  @Authenticated()
  async listCountries(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
  ) {
    const listQuery = new ListCountriesQuery({cursor, limit, query})
    return this.queryBus.execute(listQuery)
  }

  @Query('getCountry')
  @Authenticated()
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
