import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {UpdatePostCommand} from '.'
import {PostsRepo} from '../../../infra/repos'
import {PostMapper} from '../../../infra/mappers'

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(command: UpdatePostCommand) {
    const {user, ...postObj} = command
    const postDocument = await this.postsRepo.getById(user, command.id)

    if (!postDocument) {
      throw new Error('Post does not exist')
    }

    const post = PostMapper.toDomain(postDocument)

    const attrs = PostMapper.toAttrs(postObj)

    post.update(attrs)

    await this.postsRepo.save(user, post)
    return post
  }
}
