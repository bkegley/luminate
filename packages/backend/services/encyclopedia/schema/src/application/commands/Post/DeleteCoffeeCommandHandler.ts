import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {DeletePostCommand} from '.'
import {PostsRepo} from '../../../infra/repos'

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private readonly postsRepo: PostsRepo) {}

  async execute(command: DeletePostCommand) {
    return this.postsRepo.delete(command.user, command.id)
  }
}
