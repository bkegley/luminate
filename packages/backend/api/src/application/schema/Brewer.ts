import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Mutation, Query, Resolver, Args, Context} from '@nestjs/graphql'
import {Brewer} from '../../domain/Brewer'
import {BrewerMapper} from '../../infra/mappers'
import {CreateBrewerInput, UpdateBrewerInput} from '../../types'
import {CreateBrewerCommand, DeleteBrewerCommand, UpdateBrewerCommand} from '../commands'
import {AuthGuard} from '../guards'
import {ListBrewersQuery} from '../queries'
import {GetBrewerQuery} from '../queries/Brewer/GetBrewerQuery'

@Resolver('Brewer')
@UseGuards(AuthGuard)
export class BrewerResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewers')
  async listBrewers(@Args('limit') limit: number, @Args('cursor') cursor: string, @Context('user') user: Token) {
    const query = new ListBrewersQuery(user, {limit, cursor})
    return this.queryBus.execute(query)
  }

  @Query('getBrewer')
  async getBrewer(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetBrewerQuery(user, id)
    const brewer = await this.queryBus.execute(query)
    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('createBrewer')
  async createBrewer(@Args('input') input: CreateBrewerInput, @Context('user') user: Token) {
    const command = new CreateBrewerCommand(user, input)
    const brewer: Brewer = await this.commandBus.execute(command)

    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('updateBrewer')
  async updateBrewer(@Args('id') id: string, @Args('input') input: UpdateBrewerInput, @Context('user') user: Token) {
    const command = new UpdateBrewerCommand(user, id, input)
    const brewer: Brewer = await this.commandBus.execute(command)

    return BrewerMapper.toDTO(brewer)
  }

  @Mutation('deleteBrewer')
  async deleteBrewer(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteBrewerCommand(user, id)
    await this.commandBus.execute(command)

    return true
  }
}
