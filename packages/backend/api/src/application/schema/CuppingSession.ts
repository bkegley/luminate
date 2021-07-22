import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Query, Resolver, Mutation, Context} from '@nestjs/graphql'
import {CuppingSessionMapper} from '../../infra/mappers'
import {UpdateCuppingSessionInput} from '../../types'
import {CreateCuppingSessionCommand} from '../commands'
import {DeleteCuppingSessionCommand} from '../commands/CuppingSession/DeleteCuppingSessionCommand'
import {UpdateCuppingSessionCommand} from '../commands/CuppingSession/UpdateCuppingSessionCommand'
import {AuthGuard} from '../guards'
import {GetCuppingSessionQuery, ListCuppingSessionsQuery} from '../queries'

@Resolver('CuppingSession')
@UseGuards(AuthGuard)
export class CuppingSessionResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listCuppingSessions')
  async listCuppingSessions(@Context('user') user: Token) {
    const query = new ListCuppingSessionsQuery(user)
    return this.queryBus.execute(query)
  }

  @Query('getCuppingSession')
  async getCuppingSession(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetCuppingSessionQuery(user, id)
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
