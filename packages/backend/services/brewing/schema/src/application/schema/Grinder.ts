import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {CreateGrinderCommand, DeleteGrinderCommand, UpdateGrinderCommand} from '../commands'
import {GrinderMapper} from '../../infra/mappers'
import {CreateGrinderInput, UpdateGrinderInput} from '../../types'
import {GetGrinderQuery, ListGrindersQuery} from '../queries/Grinder'

@Resolver('Grinder')
export class GrinderResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listGrinders')
  async listGrinders() {
    const query = new ListGrindersQuery()
    return this.queryBus.execute(query)
  }

  @Query('getGrinder')
  async getGrinder(@Args('id') id: string) {
    const query = new GetGrinderQuery(id)
    const grinder = await this.queryBus.execute(query)

    return GrinderMapper.toDTO(grinder)
  }

  @Mutation('createGrinder')
  async createGrinder(@Args('input') input: CreateGrinderInput) {
    const command = new CreateGrinderCommand(input)
    const grinder = await this.commandBus.execute(command)
    return GrinderMapper.toDTO(grinder)
  }

  @Mutation('updateGrinder')
  async updateGrinder(@Args('id') id: string, @Args('input') input: UpdateGrinderInput) {
    const command = new UpdateGrinderCommand(id, input)
    return this.commandBus.execute(command)
  }

  @Mutation('deleteGrinder')
  async deleteGrinder(@Args('id') id: string) {
    const command = new DeleteGrinderCommand(id)
    return this.commandBus.execute(command)
  }
}
