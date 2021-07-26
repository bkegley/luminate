import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Resolver, Query, Args, Mutation, Context} from '@nestjs/graphql'
import {BrewingSessionMapper} from '../../infra/mappers'
import {GetBrewingSessionQuery, ListBrewingSessionsQuery} from '../queries/BrewingSession'
import {CreateBrewingSessionCommand, UpdateBrewingSessionCommand, DeleteBrewingSessionCommand} from '../commands'
import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '../guards'
import {CreateBrewingSessionInput, UpdateBrewingSessionInput} from '../../types'

@Resolver('BrewingSession')
@UseGuards(AuthGuard)
export class BrewingSessionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewingSessions')
  async listBrewingSessions(@Context('user') user: Token) {
    const query = new ListBrewingSessionsQuery(user)
    return this.queryBus.execute(query)
  }

  @Query('getBrewingSession')
  async getBrewingSession(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetBrewingSessionQuery(user, id)
    const brewingSession = await this.queryBus.execute(query)
    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('createBrewingSession')
  async createBrewingSession(@Args('input') input: CreateBrewingSessionInput, @Context('user') user: Token) {
    const command = new CreateBrewingSessionCommand(user, input)
    const brewingSession = await this.commandBus.execute(command)

    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('updateBrewingSession')
  async updateBrewingSession(
    @Args('id') id: string,
    @Args('input') input: UpdateBrewingSessionInput,
    @Context('user') user: Token,
  ) {
    const command = new UpdateBrewingSessionCommand(user, id, input)
    const brewingSession = await this.commandBus.execute(command)

    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('deleteBrewingSession')
  async deleteBrewingSession(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteBrewingSessionCommand(user, id)
    await this.commandBus.execute(command)

    return true
  }
}
