import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {DeleteFarmCommand} from '.'
import {FarmsRepo} from '../../../infra/repos'

@CommandHandler(DeleteFarmCommand)
export class DeleteFarmCommandHandler implements ICommandHandler<DeleteFarmCommand> {
  constructor(private readonly farmsRepo: FarmsRepo) {}

  async execute(command: DeleteFarmCommand) {
    return this.farmsRepo.delete(command.user, command.id)
  }
}
