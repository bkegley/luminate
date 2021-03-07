import {QueryBus} from '@nestjs/cqrs'
import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {CountryMapper} from '../../infra/mappers'
import {RegionMapper} from '../../infra/mappers/RegionMapper'
import {CountryLoader} from '../../infra/loaders'
import {GetRegionQuery, ListRegionsQuery} from '../queries'
import {IRegionDTO} from '../../infra/dtos'

@Resolver('Region')
export class RegionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly countryLoader: CountryLoader) {}

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
  async country(@Parent() region: IRegionDTO) {
    if (!region.country) {
      return null
    }

    const country = await this.countryLoader.getById(region.country)
    return CountryMapper.toDTO(country)
  }
}
