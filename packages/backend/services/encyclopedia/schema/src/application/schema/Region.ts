import {QueryBus} from '@nestjs/cqrs'
import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {CountryMapper} from '../../infra/mappers'
import {RegionMapper} from '../../infra/mappers/RegionMapper'
import {GetCountryQuery, GetRegionQuery, ListRegionsQuery} from '../queries'

@Resolver('Region')
export class RegionResolvers {
  constructor(private readonly queryBus: QueryBus) {}

  @Query('listRegions')
  async listRegions() {
    const query = new ListRegionsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getRegion')
  async getRegion(@Args('id') id: string) {
    const query = new GetRegionQuery(id)
    const region = await this.queryBus.execute(query)

    return RegionMapper.toDTO(region)
  }

  @ResolveField()
  async country(@Parent() region: any) {
    console.log({region})
    const query = new GetCountryQuery(region.country)
    const country = await this.queryBus.execute(query)
    console.log({country})

    return CountryMapper.toDTO(country)
  }
}
