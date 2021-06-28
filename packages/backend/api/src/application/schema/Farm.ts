import {Scopes, Token} from '@luminate/graphql-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {IFarmDTO} from '../../infra/dtos'
import {CountryLoader, RegionLoader} from '../../infra/loaders'
import {CountryMapper, FarmMapper, RegionMapper} from '../../infra/mappers'
import {CreateFarmInput, QueryInput, UpdateFarmInput} from '../../types'
import {AuthGuard} from '../guards/AuthGuard'
import {CreateFarmCommand, DeleteFarmCommand, UpdateFarmCommand} from '../commands'
import {GetFarmQuery, ListFarmsQuery} from '../queries'

@Resolver('Farm')
@UseGuards(AuthGuard)
export class FarmResolvers {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly countryLoader: CountryLoader,
    private readonly regionLoader: RegionLoader,
  ) {}

  @Query('listFarms')
  @Scopes('read:farm')
  async listFarms(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
    @Context('user') user: Token,
  ) {
    const listFarmsQuery = new ListFarmsQuery(user, {cursor, limit, query})
    return this.queryBus.execute(listFarmsQuery)
  }

  @Query('getFarm')
  @Scopes('read:farm')
  async getFarm(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetFarmQuery(user, id)
    return this.queryBus.execute(query)
  }

  @Mutation('createFarm')
  @Scopes('write:farm')
  async createFarm(@Args('input') input: CreateFarmInput, @Context('user') user: Token) {
    const command = new CreateFarmCommand(user, input)
    const farm = await this.commandBus.execute(command)
    if (!farm) {
      return null
    }

    return FarmMapper.toDTO(farm)
  }

  @Mutation('updateFarm')
  @Scopes('write:farm')
  async updateFarm(@Args('id') id: string, @Args('input') input: UpdateFarmInput, @Context('user') user: Token) {
    const command = new UpdateFarmCommand(user, id, input)
    const farm = await this.commandBus.execute(command)
    if (!farm) {
      return null
    }

    return FarmMapper.toDTO(farm)
  }

  @Mutation('deleteFarm')
  @Scopes('write:farm')
  async deleteFarm(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteFarmCommand(user, id)
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
