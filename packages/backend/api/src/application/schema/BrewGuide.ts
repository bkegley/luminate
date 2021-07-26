import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {BrewGuideMapper} from '../../infra/mappers'
import {CreateBrewGuideInput, UpdateBrewGuideInput} from '../../types'
import {CreateBrewGuideCommand, DeleteBrewGuideCommand, UpdateBrewGuideCommand} from '../commands'
import {AuthGuard} from '../guards'
import {ListBrewGuidesQuery} from '../queries'
import {GetBrewGuideQuery} from '../queries/BrewGuide/GetBrewGuideQuery'

@Resolver('BrewGuide')
@UseGuards(AuthGuard)
export class BrewGuideResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewGuides')
  async listBrewGuides(@Context('user') user: Token) {
    const query = new ListBrewGuidesQuery(user)
    return this.queryBus.execute(query)
  }

  @Query('getBrewGuide')
  async getBrewGuide(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetBrewGuideQuery(user, id)
    const brewGuide = await this.queryBus.execute(query)
    return BrewGuideMapper.toDTO(brewGuide)
  }

  @Mutation('createBrewGuide')
  async createBrewGuide(@Args('input') input: CreateBrewGuideInput, @Context('user') user: Token) {
    const command = new CreateBrewGuideCommand(user, input)
    const brewGuide = await this.commandBus.execute(command)
    return brewGuide
  }

  @Mutation('updateBrewGuide')
  async updateBrewGuide(
    @Args('id') id: string,
    @Args('input') input: UpdateBrewGuideInput,
    @Context('user') user: Token,
  ) {
    const command = new UpdateBrewGuideCommand(user, id, input)
    const brewGuide = await this.commandBus.execute(command)
    return brewGuide
  }

  @Mutation('deleteBrewGuide')
  async deleteBrewGuide(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteBrewGuideCommand(user, id)
    return this.commandBus.execute(command)
  }
}
