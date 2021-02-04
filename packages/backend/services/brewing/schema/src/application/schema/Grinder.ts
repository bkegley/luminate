import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {CreateGrinderCommand} from '../commands'
import {GrinderMapper} from '../../infra/mappers'

@Resolver('Grinder')
export class GrinderResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Mutation('createGrinder')
  async createGrinder(@Args('input') input: any) {
    const command = new CreateGrinderCommand(input)
    const grinder = await this.commandBus.execute(command)
    return GrinderMapper.toDTO(grinder)
  }
}
