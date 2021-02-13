import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Query, Resolver, Mutation} from '@nestjs/graphql'
import {CuppingSessionMapper} from '../../infra/mappers'
import {UpdateCuppingSessionInput} from '../../types'
import {CreateCuppingSessionCommand} from '../commands'
import {DeleteCuppingSessionCommand} from '../commands/CuppingSession/DeleteCuppingSessionCommand'
import {UpdateCuppingSessionCommand} from '../commands/CuppingSession/UpdateCuppingSessionCommand'
import {GetCuppingSessionQuery, ListCuppingSessionsQuery} from '../queries'

@Resolver('CuppingSession')
export class CuppingSessionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listCuppingSessions')
  async listCuppingSessions() {
    const query = new ListCuppingSessionsQuery()
    return this.queryBus.execute(query)
  }

  @Query('getCuppingSession')
  async getCuppingSession(@Args('id') id: string) {
    const query = new GetCuppingSessionQuery(id)
    const cuppingSession = await this.queryBus.execute(query)

    if (!cuppingSession) {
      return null
    }

    return CuppingSessionMapper.toDTO(cuppingSession)
  }

  @Mutation('createCuppingSession')
  async createCuppingSession(@Args('input') input: any) {
    const command = new CreateCuppingSessionCommand(input)
    const cuppingSession = await this.commandBus.execute(command)

    return CuppingSessionMapper.toDTO(cuppingSession)
  }

  @Mutation('updateCuppingSession')
  async updateCuppingSession(@Args('id') id: string, @Args('input') input: UpdateCuppingSessionInput) {
    const command = new UpdateCuppingSessionCommand(id, input)
    const cuppingSession = await this.commandBus.execute(command)
    if (!cuppingSession) {
      return null
    }

    return CuppingSessionMapper.toDTO(cuppingSession)
  }

  @Mutation('deleteCuppingSession')
  async deleteCuppingSession(@Args('id') id: string) {
    const command = new DeleteCuppingSessionCommand(id)
    return this.commandBus.execute(command)
  }
}
