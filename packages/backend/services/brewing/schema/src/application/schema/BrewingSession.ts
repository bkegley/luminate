import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Resolver, Query, Args, Mutation} from '@nestjs/graphql'
import {BrewingSessionMapper} from '../../infra/mappers'
import {GetBrewingSessionQuery, ListBrewingSessionsQuery} from '../queries/BrewingSession'
import {CreateBrewingSessionCommand, UpdateBrewingSessionCommand, DeleteBrewingSessionCommand} from '../commands'

@Resolver('BrewingSession')
export class BrewingSessionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewingSessions')
  async listBrewingSessions() {
    const query = new ListBrewingSessionsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getBrewingSession')
  async getBrewingSession(@Args('id') id: string) {
    const query = new GetBrewingSessionQuery(id)
    const brewingSession = await this.queryBus.execute(query)
    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('createBrewingSession')
  async createBrewingSession(@Args('input') input: any) {
    const command = new CreateBrewingSessionCommand(input)
    const brewingSession = await this.commandBus.execute(command)

    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('updateBrewingSession')
  async updateBrewingSession(@Args('id') id: string, @Args('input') input: any) {
    const command = new UpdateBrewingSessionCommand(id, input)
    const brewingSession = await this.commandBus.execute(command)

    return BrewingSessionMapper.toDTO(brewingSession)
  }

  @Mutation('deleteBrewingSession')
  async deleteBrewingSession(@Args('id') id: string) {
    const command = new DeleteBrewingSessionCommand(id)
    const brewingSession = await this.commandBus.execute(command)

    return true
  }
}
