import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {IFarmDTO} from '../../infra/dtos'
import {CountryLoader, RegionLoader} from '../../infra/loaders'
import {CountryMapper, FarmMapper, RegionMapper} from '../../infra/mappers'
import {CreateFarmInput, UpdateFarmInput} from '../../types'
import {CreateFarmCommand, DeleteFarmCommand, UpdateFarmCommand} from '../commands'
import {GetFarmQuery, ListFarmsQuery} from '../queries'

@Resolver('Farm')
export class FarmResolvers {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly countryLoader: CountryLoader,
    private readonly regionLoader: RegionLoader,
  ) {}

  @Query('listFarms')
  async listFarms() {
    const query = new ListFarmsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getFarm')
  async getFarm(@Args('id') id: string) {
    const query = new GetFarmQuery(id)
    return this.queryBus.execute(query)
  }

  @Mutation('createFarm')
  async createFarm(@Args('input') input: CreateFarmInput) {
    const command = new CreateFarmCommand(input)
    const farm = await this.commandBus.execute(command)
    if (!farm) {
      return null
    }

    return FarmMapper.toDTO(farm)
  }

  @Mutation('updateFarm')
  async updateFarm(@Args('id') id: string, @Args('input') input: UpdateFarmInput) {
    const command = new UpdateFarmCommand(id, input)
    const farm = await this.commandBus.execute(command)
    if (!farm) {
      return null
    }

    return FarmMapper.toDTO(farm)
  }

  @Mutation('deleteFarm')
  async deleteFarm(@Args('id') id: string) {
    const command = new DeleteFarmCommand(id)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  async country(@Parent() farm: IFarmDTO) {
    if (!farm.countryId) {
      return null
    }

    const country = await this.countryLoader.getById(farm.countryId)
    return CountryMapper.toDTO(country)
  }

  @ResolveField()
  async region(@Parent() farm: IFarmDTO) {
    if (!farm.regionId) {
      return null
    }

    const region = await this.regionLoader.getById(farm.regionId)
    return RegionMapper.toDTO(region)
  }
}
//Mutation: {
//createFarmZone: async (parent, {farmId, input}, {services}) => {
//return services.farm.createFarmZone(farmId, input)
//},
//updateFarmZone: async (parent, {id, input}, {services}) => {
//return services.farm.updateFarmZoneById(id, input)
//},
//deleteFarmZone: async (parent, {id}, {services}) => {
//return services.farm.deleteFarmZoneById(id)
//},
//},
