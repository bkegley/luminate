import {Scopes} from '@luminate/graphql-utils'
import {Token} from '@luminate/mongo-utils'
import {UseGuards} from '@nestjs/common'
import {CommandBus, QueryBus} from '@nestjs/cqrs'
import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql'
import {PostAggregate} from '../../domain/Post/Post'
import {PostMapper} from '../../infra/mappers/PostMapper'
import {PostDocument} from '../../infra/models'
import {CreatePostInput, UpdatePostInput, QueryInput} from '../../types'
import {AuthGuard} from '../guards/AuthGuard'
import {CreatePostCommand, DeletePostCommand, UpdatePostCommand, TogglePostPinCommand} from '../commands/Post'
import {GetEntityPostsQuery, GetPostQuery, ListPostsQuery} from '../queries/Post'

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

  @Query('getEntityPosts')
  @Scopes('read:post')
  async getEntityPosts(@Args('id') id: string, @Context('user') user: Token) {
    const query = new GetEntityPostsQuery(user, id)
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

  @Mutation('togglePin')
  @Scopes('write:post')
  async togglePin(@Args('id') id: string, @Args('entityId') entityId: string, @Context('user') user: Token) {
    const command = new TogglePostPinCommand(user, id, entityId)
    return this.commandBus.execute(command)
  }

  @ResolveField()
  async pinned(@Parent() post: PostDocument, @Args('entityId') entityId: string) {
    const entityRelation = post.relations.find(relation => relation.id.toString() === entityId)
    return entityRelation?.pinned ?? false
  }
}
