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

//const resolvers: Resolvers = {
//Query: {
//listBrewers: async (_parent, _args, {container}) => {
//const brewersView = container.resolve<IBrewersView>(TYPES.BrewersView)
//return brewersView.listBrewers()
//},
//getBrewer: async (_parent, {id}, {container}) => {
//const brewersView = container.resolve<IBrewersView>(TYPES.BrewersView)
//return brewersView.getBrewerById(id)
//},
//},
//Mutation: {
//createBrewer: async (_parent, {input}, {container}) => {
//const createBrewerCommand = new CreateBrewerCommand(input)

//const brewer = await container
//.resolve<ICommandRegistry>(TYPES.CommandRegistry)
//.process<ICreateBrewerCommandHandler>(CommandType.CREATE_BREWER_COMMAND, createBrewerCommand)

//return BrewerMapper.toDTO(brewer)
//},
//updateBrewer: async (_parent, {id, input}, {container}) => {
//const updateBrewerCommand = new UpdateBrewerCommand(id, input)

//const brewer = await container
//.resolve<ICommandRegistry>(TYPES.CommandRegistry)
//.process<IUpdateBrewerCommandHandler>(CommandType.UPDATE_BREWER_COMMAND, updateBrewerCommand)

//return BrewerMapper.toDTO(brewer)
//},
//deleteBrewer: async (_parent, {id}, {container}) => {
//const deleteBrewerCommand = new DeleteBrewerCommand(id)

//const brewer = await container
//.resolve<ICommandRegistry>(TYPES.CommandRegistry)
//.process<IDeleteBrewerCommandHandler>(CommandType.DELETE_BREWER_COMMAND, deleteBrewerCommand)

//if (!brewer) {
//return false
//}
//return true
//},
//},
//}

//export const schema = {typeDefs, resolvers}
