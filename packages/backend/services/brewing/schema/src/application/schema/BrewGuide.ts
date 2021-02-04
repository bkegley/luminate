import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {BrewGuideMapper} from '../../infra/mappers'
import {CreateBrewGuideCommand, DeleteBrewGuideCommand, UpdateBrewGuideCommand} from '../commands'
import {ListBrewGuidesQuery} from '../queries'
import {GetBrewGuideQuery} from '../queries/BrewGuide/GetBrewGuideQuery'

@Resolver('BrewGuide')
export class BrewGuideResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listBrewGuides')
  async listBrewGuides() {
    const query = new ListBrewGuidesQuery()
    return this.queryBus.execute(query)
  }

  @Query('getBrewGuide')
  async getBrewGuide(@Args('id') id: string) {
    const query = new GetBrewGuideQuery(id)
    const brewGuide = await this.queryBus.execute(query)
    return BrewGuideMapper.toDTO(brewGuide)
  }

  @Mutation('createBrewGuide')
  async createBrewGuide(@Args('input') input: any) {
    const command = new CreateBrewGuideCommand(input)
    const brewGuide = await this.commandBus.execute(command)
    return brewGuide
  }

  @Mutation('updateBrewGuide')
  async updateBrewGuide(@Args('id') id: string, @Args('input') input: any) {
    const command = new UpdateBrewGuideCommand(id, input)
    const brewGuide = await this.commandBus.execute(command)
    return brewGuide
  }

  @Mutation('deleteBrewGuide')
  async deleteBrewGuide(@Args('id') id: string) {
    const command = new DeleteBrewGuideCommand(id)
    return this.commandBus.execute(command)
  }
}

//const resolvers: Resolvers = {
//Query: {
//listBrewGuides: async (parent, args, {container}) => {
//const brewGuidesView = container.resolve<IBrewGuidesView>(TYPES.BrewGuidesView)
//return brewGuidesView.listBrewGuides()
//},
//getBrewGuide: async (parent, {id}, {container}) => {
//const brewGuidesView = container.resolve<IBrewGuidesView>(TYPES.BrewGuidesView)
//return brewGuidesView.getBrewGuideById(id)
//},
//},
//Mutation: {
//createBrewGuide: async (parent, {input}, {container}) => {
//const createBrewGuideCommand = new CreateBrewGuideCommand(input)
//const brewGuide = await container
//.resolve<ICommandRegistry>(TYPES.CommandRegistry)
//.process<ICreateBrewGuideCommandHandler>(CommandType.CREATE_BREW_GUIDE_COMMAND, createBrewGuideCommand)

//return BrewGuideMapper.toDTO(brewGuide)
//},
//},
//}
