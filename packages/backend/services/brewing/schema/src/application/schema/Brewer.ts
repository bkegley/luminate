import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Mutation, Query, Resolver, Args} from '@nestjs/graphql'
import {Brewer} from '../../domain/Brewer'
import {BrewerMapper} from '../../infra/mappers'
import {CreateBrewerCommand, DeleteBrewerCommand, UpdateBrewerCommand} from '../commands'
import {ListBrewersQuery} from '../queries'
import {GetBrewerQuery} from '../queries/Brewer/GetBrewerQuery'

@Resolver('Brewer')
export class BrewerResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewers')
  async listBrewers(@Args('limit') limit: number, @Args('cursor') cursor: string) {
    const query = new ListBrewersQuery({limit, cursor})
    return this.queryBus.execute(query)
  }

  @Query('getBrewer')
  async getBrewer(@Args('id') id: string) {
    const query = new GetBrewerQuery(id)
    const brewer = await this.queryBus.execute(query)
    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('createBrewer')
  async createBrewer(@Args('input') input: any) {
    const command = new CreateBrewerCommand(input)
    const brewer: Brewer = await this.commandBus.execute(command)

    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('updateBrewer')
  async updateBrewer(@Args('id') id: string, @Args('input') input: any) {
    const command = new UpdateBrewerCommand(id, input)
    const brewer: Brewer = await this.commandBus.execute(command)

    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('deleteBrewer')
  async deleteBrewer(@Args('id') id: string) {
    const command = new DeleteBrewerCommand(id)
    await this.commandBus.execute(command)

    return true
  }
}
