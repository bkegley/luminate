import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Query, Resolver, Mutation, ResolveField, Parent} from '@nestjs/graphql'
import {SessionCoffee} from '../../domain/CuppingSession/SessionCoffee'
import {CuppingSessionMapper} from '../../infra/mappers'
import {SessionCoffeeInput, UpdateCuppingSessionInput} from '../../types'
import {CreateCuppingSessionCommand, LockCuppingSessionCommand} from '../commands'
import {DeleteCuppingSessionCommand} from '../commands/CuppingSession/DeleteCuppingSessionCommand'
import {UpdateCuppingSessionCoffeesCommand} from '../commands/CuppingSession/UpdateCuppingSessionCoffeesCommand'
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

  @Mutation('updateCuppingSessionCoffees')
  async updateCuppingSessionCoffees(
    @Args('id') id: string,
    @Args('sessionCoffees') sessionCoffees: SessionCoffeeInput[],
  ) {
    const command = new UpdateCuppingSessionCoffeesCommand(id, sessionCoffees)
    const cuppingSession = await this.commandBus.execute(command)
    if (!cuppingSession) {
      return null
    }

    return CuppingSessionMapper.toDTO(cuppingSession)
  }

  @Mutation('lockCuppingSession')
  async lockCuppingSession(@Args('id') id: string) {
    const command = new LockCuppingSessionCommand(id)
    const cuppingSession = await this.commandBus.execute(command)
    if (!cuppingSession) {
      return null
    }

    return CuppingSessionMapper.toDTO(cuppingSession)
  }
}

@Resolver('SessionCoffee')
export class SessionCoffeeResolvers {
  @ResolveField('coffee')
  coffee(@Parent() sessionCoffee: SessionCoffee) {
    // @ts-ignore
    const id = sessionCoffee.coffee.toString()
    console.log({id})
    return {__typename: 'Coffee', id}
  }
}
