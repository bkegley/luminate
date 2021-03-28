import {Scopes} from '@luminate/graphql-utils'
import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {PostAggregate} from '../../domain/Post/Post'
import {PostMapper} from '../../infra/mappers/PostMapper'
import {CreatePostInput, UpdatePostInput, QueryInput} from '../../types'
import {AuthGuard} from '../AuthGuard'
import {CreatePostCommand, DeletePostCommand, UpdatePostCommand} from '../commands/Post'
import {GetPostQuery, ListPostsQuery} from '../queries/Post'

@Resolver('Post')
@UseGuards(AuthGuard)
export class PostResolvers {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Query('listPosts')
  @Scopes('read:post')
  async listPosts(
    @Args('cursor') cursor: string,
    @Args('limit') limit: number,
    @Args('query') query: QueryInput[],
    @Context('user') user: Token,
  ) {
    const postQuery = new ListPostsQuery(user, {cursor, limit, query})
    return this.queryBus.execute(postQuery)
  }

  @Query('getPost')
  @Scopes('read:post')
  async getPost(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetPostQuery(user, id)
    return this.queryBus.execute(query)
  }

  @Mutation('createPost')
  @Scopes('write:post')
  async createPost(@Args('input') input: CreatePostInput, @Context('user') user: Token) {
    const command = new CreatePostCommand(user, input)
    const post: PostAggregate = await this.commandBus.execute(command)

    return PostMapper.toDTO(post)
  }

  @Mutation('updatePost')
  @Scopes('write:post')
  async updatePost(@Args('id') id: string, @Args('input') input: UpdatePostInput, @Context('user') user: Token) {
    const command = new UpdatePostCommand(user, id, input)
    const post: PostAggregate = await this.commandBus.execute(command)

    return PostMapper.toDTO(post)
  }

  @Mutation('deletePost')
  @Scopes('write:post')
  async deletePost(@Args('id') id: string, @Context('user') user: Token) {
    const command = new DeletePostCommand(user, id)
    return this.commandBus.execute(command)
  }
}
