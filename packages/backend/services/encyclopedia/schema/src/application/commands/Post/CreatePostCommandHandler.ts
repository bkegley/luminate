import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import {PostAggregate} from '../../../domain/Post/Post'
import {PostContent} from '../../../domain/Post/PostContent'
import {PostMapper} from '../../../infra/mappers'
import {PostsRepo} from '../../../infra/repos'
import {CreatePostCommand} from '.'
import {EntityId} from '@luminate/services-shared'
import {PostRelation} from '../../../domain/Post/PostRelation'

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand, PostAggregate> {
  constructor(private readonly eventBus: EventBus, private readonly postsRepo: PostsRepo) {}

  async execute(command: CreatePostCommand) {
    const post = PostAggregate.create({
      title: command.title,
      content: PostContent.create(command.content),
      relations: command.relations
        ? command.relations.map(relation =>
            PostRelation.create({type: relation.type, pinned: relation.pinned}, EntityId.create(relation.id)),
          )
        : null,
    })

    await this.postsRepo.create(command.user, PostMapper.toPersistence(post))
    post.events.forEach(event => this.eventBus.publish(event))

    return post
  }
}
