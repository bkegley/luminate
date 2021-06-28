import {QueryBus} from '@nestjs/cqrs'
import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {CountryMapper} from '../../infra/mappers'
import {CountryLoader} from '../../infra/loaders'
import {GetRegionQuery, ListRegionsQuery} from '../queries'
import {IRegionDTO} from '../../infra/dtos'
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '../guards/AuthGuard'
import {Authenticated} from '@luminate/graphql-utils'

@Resolver('Region')
@UseGuards(AuthGuard)
export class RegionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly countryLoader: CountryLoader) {}

  @Query('listRegions')
  @Authenticated()
  async listRegions() {
    const query = new ListRegionsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getRegion')
  @Authenticated()
  async getRegion(@Args('id') id: string) {
    const query = new GetRegionQuery(id)
    return this.queryBus.execute(query)
  }

  @ResolveField()
  async country(@Parent() region: IRegionDTO) {
    if (!region.country) {
      return null
    }

    const country = await this.countryLoader.getById(region.country)
    return CountryMapper.toDTO(country)
  }
}
