import {EntityId} from '@luminate/services-shared'
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {PostMapper} from '../../../infra/mappers'
import {PostsRepo} from '../../../infra/repos'
import {TogglePostPinCommand} from './TogglePostPinCommand'

@CommandHandler(TogglePostPinCommand)
export class TogglePostPinCommandHandler implements ICommandHandler<TogglePostPinCommand> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(command: TogglePostPinCommand) {
    const postDocument = await this.postsRepo.getById(command.user, command.id)
    if (!postDocument) {
      throw new Error('Post not found')
    }

    const post = PostMapper.toDomain(postDocument)

    post.togglePin(EntityId.create(command.entityId))

    await this.postsRepo.save(post)
    return true
  }
}
