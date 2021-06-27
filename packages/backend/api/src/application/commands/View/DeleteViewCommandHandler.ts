import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {DeleteViewCommand} from '.'
import {ViewsRepo} from '../../../infra/repos'

@CommandHandler(DeleteViewCommand)
export class DeleteViewCommandHandler implements ICommandHandler<DeleteViewCommand> {
  constructor(private readonly viewsRepo: ViewsRepo) {}

  async execute(command: DeleteViewCommand) {
    return this.viewsRepo.delete(command.user, command.id)
  }
}
