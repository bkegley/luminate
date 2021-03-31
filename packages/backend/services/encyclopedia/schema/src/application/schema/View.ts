import {Authenticated, Token} from '@luminate/graphql-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {ViewMapper} from '../../infra/mappers'
import {CreateViewInput, QueryInput} from '../../types'
import {AuthGuard} from '../AuthGuard'
import {CreateViewCommand, DeleteViewCommand, UpdateViewCommand} from '../commands'
import {GetViewQuery, ListViewsQuery} from '../queries'

@Resolver('View')
@UseGuards(AuthGuard)
export class ViewResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listViews')
  @Authenticated()
  async listViews(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
    @Context('user') user: Token,
  ) {
    const listQuery = new ListViewsQuery(user, {cursor, limit, query})
    return this.queryBus.execute(listQuery)
  }

  @Query('getView')
  @Authenticated()
  async getView(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetViewQuery(user, id)
    return this.queryBus.execute(query)
  }

  @Mutation('createView')
  @Authenticated()
  async createView(@Args('input') input: CreateViewInput, @Context('user') user: Token) {
    const command = new CreateViewCommand(user, input)
    const view = await this.commandBus.execute(command)
    if (!view) {
      return null
    }
    return ViewMapper.toDTO(view)
  }

  @Mutation('updateView')
  @Authenticated()
  async updateView(@Args('id') id: string, @Args('input') input: CreateViewInput, @Context('user') user: Token) {
    const command = new UpdateViewCommand(user, id, input)
    const view = await this.commandBus.execute(command)
    if (!view) {
      // possibly throw error instead?
      return null
    }
    return ViewMapper.toDTO(view)
  }

  @Mutation('deleteView')
  @Authenticated()
  async deleteView(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeleteViewCommand(user, id)
    return this.commandBus.execute(command)
  }
}
