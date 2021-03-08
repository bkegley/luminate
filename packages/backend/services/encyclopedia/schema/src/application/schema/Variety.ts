import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {IVarietyDTO} from '../../infra/dtos'
import {CoffeeLoader} from '../../infra/loaders'
import {CoffeeMapper, VarietyMapper} from '../../infra/mappers'
import {CreateVarietyInput} from '../../types'
import {CreateVarietyCommand, DeleteVarietyCommand, UpdateVarietyCommand} from '../commands'
import {GetVarietyQuery, ListVarietiesQuery} from '../queries'

@Resolver('Variety')
export class VarietyResolvers {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly coffeeLoader: CoffeeLoader,
  ) {}

  @Query('listVarieties')
  async listVarieties() {
    const query = new ListVarietiesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getVariety')
  async getVariety(@Args('id') id: string) {
    const query = new GetVarietyQuery(id)
    return this.queryBus.execute(query)
  }

  @Mutation('createVariety')
  async createVariety(@Args('input') input: CreateVarietyInput) {
    const command = new CreateVarietyCommand(input)
    const variety = await this.commandBus.execute(command)
    if (!variety) {
      return null
    }

    return VarietyMapper.toDTO(variety)
  }

  @Mutation('updateVariety')
  async updateVariety(@Args('id') id: string, @Args('input') input: CreateVarietyInput) {
    const command = new UpdateVarietyCommand(id, input)
    const variety = await this.commandBus.execute(command)
    if (!variety) {
      // possibly throw error instead?
      return null
    }

    return VarietyMapper.toDTO(variety)
  }

  @Mutation('deleteVariety')
  async deleteVariety(@Args('id') id: string) {
    const command = new DeleteVarietyCommand(id)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  async coffees(@Parent() variety: IVarietyDTO) {
    const coffees = await this.coffeeLoader.listByVarietyId(variety.id)
    return coffees.map(coffee => CoffeeMapper.toDTO(coffee))
  }
}
